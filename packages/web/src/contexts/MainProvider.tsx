import React, {createContext, useEffect, useMemo, useState} from 'react';
import {CartList} from "../pages/WeeklyMenu/WeeklyMenu";
import {useAuthenticator} from "@aws-amplify/ui-react";
import {AuthUser} from 'aws-amplify/auth';
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {decryptData} from "../utils/handle";
import {User} from "../utils/type";

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
        console.error('Ошибка при дешифровке данных:', error);
      }
    }
  },[user?.signInDetails, getUser?.data])

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
