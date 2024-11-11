import React, {createContext, useEffect, useMemo, useState} from 'react';
import {CartList} from "../pages/WeeklyMenu/WeeklyMenu";
import {useAuthenticator} from "@aws-amplify/ui-react";
import {AuthUser} from 'aws-amplify/auth';
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {decryptData} from "../utils/handle";
import {User} from "../utils/type";
import {message} from "antd";
import {defaultParams} from "../constants";

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

  const context = useMemo(() =>
      ({ additionalTypenames: ["users"] }),
    [user?.signInDetails?.loginId]);

  const query = user?.signInDetails?.loginId?.toLowerCase().trim() || ''

  const [getUser] = useTypedQuery({
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
    context,
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
    setCartList([])
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  useEffect(() => {
    if (user?.signInDetails && getUser?.data?.user) {
      setUserData(getUser?.data?.user)
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
  },[user?.signInDetails, getUser?.data?.user])

  let timeClear = localStorage.getItem('cartTimestamp')

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
