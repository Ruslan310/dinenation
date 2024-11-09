import React, {createContext, useEffect, useMemo, useState} from 'react';
import {CartList} from "../pages/WeeklyMenu/WeeklyMenu";
import {useAuthenticator} from "@aws-amplify/ui-react";
import {AuthUser} from 'aws-amplify/auth';
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {decryptData} from "../utils/handle";
import {User} from "../utils/type";
import {message} from "antd";
import {TIME_LIMIT} from "../constants";

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

  const [getUser] = useTypedQuery({
    query: {
      user: {
        __args: {
          email: user?.signInDetails?.loginId || ''
        },
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
    context
  });

  const clearCart = async () => {
    localStorage.removeItem('cartList');
    localStorage.removeItem('cartTimestamp');
    message.info({content: 'Trash empty'});
    setCartList([])
  };

  useEffect(() => {
    if (user?.signInDetails && getUser?.data?.user) {
      setUserData(getUser?.data?.user)
    }
    const savedCartList = localStorage.getItem('cartList');
    if (savedCartList) {
      try {
        const jsonData = decryptData(savedCartList);  // Дешифруем данные
        setCartList(JSON.parse(jsonData));  // Преобразуем строку JSON в объект и устанавливаем в состояние
      } catch (error) {
        console.error('Error when decrypting data:', error);
      }
    }
  },[user?.signInDetails, getUser?.data])

  useEffect(() => {
    const checkCartExpiration = () => {
      const cartTimestamp = localStorage.getItem('cartTimestamp');
      if (cartTimestamp) {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - parseInt(cartTimestamp, 10);

        if (timeDifference >= TIME_LIMIT) { // 30 минут = 1800000 миллисекунд
          // clearCart();
        }
      }
    };
    const intervalId = setInterval(checkCartExpiration, 60000);
    checkCartExpiration();
    return () => clearInterval(intervalId);
  }, []);

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
