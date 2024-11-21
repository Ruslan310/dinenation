import React, {createContext, useEffect, useState} from 'react';
import {CartList} from "../pages/WeeklyMenu/WeeklyMenu";
import {useAuthenticator} from "@aws-amplify/ui-react";
import {AuthUser} from 'aws-amplify/auth';
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {decryptData, sendBotMessageForMe} from "../utils/handle";
import {User} from "../utils/type";
import {message} from "antd";
import {defaultParams} from "../constants";
import dayjs from "dayjs";
import {dateFormat} from "../utils/utils";

export interface MainProps {
  cartList: CartList[];
  setCartList: React.Dispatch<React.SetStateAction<CartList[]>>;
  user: AuthUser | undefined;
  userData: User | undefined;
  setUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
  authStatus: string | undefined;
  signOut: () => void;
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export const MainContext = createContext<MainProps>({
  cartList: [],
  setCartList: () => [],
  user: undefined,
  userData: undefined,
  setUserData: () => {},
  authStatus: undefined,
  signOut: () => {},
  visible: false,
  setVisible: () => false,
});

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const {user, signOut, authStatus} = useAuthenticator((context) => [context.user]);
  const [userData, setUserData] = useState<User>();
  const [cartList, setCartList] = useState<CartList[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  const query = user?.signInDetails?.loginId?.toLowerCase() || ''

  // const testUser = {
  //   id: 307,
  //   first_name: "test ",
  //   last_name: "tessst  ввв  ыыы",
  //   email: "rageli7871@cpaurl.com",
  //   address: null,
  //   phone: "+44999598699",
  //   role: "public",
  //   image: null,
  //   is_update: false,
  //   coupon: {
  //     id: 199,
  //     title: "Brainrocket",
  //     address: "Limasol",
  //     check_order: false,
  //     hide_price: true,
  //     office: [],
  //     domain: {
  //       id: 133,
  //       title: "Brainrocket+dessert+15.75",
  //       __typename: "Domain"
  //     },
  //     __typename: "Coupons"
  //   },
  //   __typename: "Users"
  // }

  const [getUser, refetchUser] = useTypedQuery({
    query: {
      user: {
        __args: {email: query},
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        address: true,
        phone: true,
        role: true,
        image: true,
        is_update: true,
        coupon: {
          id: true,
          title: true,
          address: true,
          check_order: true,
          hide_price: true,
          office: {
            id: true,
            title: true,
          },
          domain: {
            id: true,
            title: true,
          }
        },
      },
    },
    requestPolicy: 'network-only',
    pause: !query
  });

  const content = (
    <div style={{padding: 20}}>
      <p>Time's up, cart is empty</p>
    </div>
  )

  const clearCart = async () => {
    localStorage.removeItem('cartList');
    localStorage.removeItem('cartTimestamp');
    localStorage.removeItem('cartTComment');
    message.info({content: content});
    setCartList([]);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  useEffect(() => {
    if (user?.signInDetails && getUser?.data) {
      setUserData(getUser?.data?.user);
      // setUserData(testUser);
      try {
        sendBotMessageForMe(`
      Prov
      - authStatus - ${authStatus}
      - err - ${getUser?.error}
      - getUser -${JSON.stringify(getUser.data?.user)}-
      - date - ${dayjs().format(dateFormat.DATE_TIME)}
      - query -${query}-
    `)
      } catch (e) {
        console.log('----err', e)
      }
    } else if (user?.signInDetails && !getUser?.data) {
      refetchUser({requestPolicy: 'network-only'});
    }

    const savedCartList = localStorage.getItem('cartList');
    if (savedCartList) {
      try {
        const jsonData = decryptData(savedCartList);
        setCartList(JSON.parse(jsonData));
      } catch (error) {
        console.error('Error when decrypting data:', error);
      }
    }

  },[user?.signInDetails, getUser?.data])


  let timeClear = localStorage.getItem('cartTimestamp') || '';

  useEffect(() => {
    const checkCartExpiration = () => {
      const cartTimestamp = localStorage.getItem('cartTimestamp');
      if (cartTimestamp) {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - parseInt(cartTimestamp, 10);

        if (timeDifference >= defaultParams.TIME_LIMIT) { // 20 minutes
          clearCart().then();
        }
      }
    };

    const intervalId = setInterval(checkCartExpiration, 60000);
    checkCartExpiration();
    return () => clearInterval(intervalId);
  }, [timeClear]);

  return (
    <MainContext.Provider
      value={{
        cartList,
        setCartList,
        user,
        userData,
        setUserData,
        authStatus,
        signOut,
        visible,
        setVisible,
      }}>
      {children}
    </MainContext.Provider>
  );
};
