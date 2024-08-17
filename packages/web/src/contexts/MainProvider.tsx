import React, {createContext, useEffect, useMemo, useState} from 'react';
import {CartList} from "../pages/WeeklyMenu/WeeklyMenu";
import {useAuthenticator} from "@aws-amplify/ui-react";
import {AuthUser} from 'aws-amplify/auth';
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";

interface User {
  id: number,
  full_name: string,
  email: string,
  address: string | null | undefined,
  phone: string,
  coupon: string,
  domain_id: number,
}

export interface MainProps {
  cartList: CartList[];
  setCartList: React.Dispatch<React.SetStateAction<CartList[]>>; // Updated to reflect the array type
  user: AuthUser | undefined;
  userData: User | undefined;
  authStatus: string | undefined;
  signOut: () => void;
}

export const MainContext = createContext<MainProps>({
  cartList: [],
  setCartList: () => [],
  user: undefined,
  userData: undefined,
  authStatus: undefined,
  signOut: () => {},
});

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const {user, signOut, authStatus} = useAuthenticator((context) => [context.user]);
  const [userData, setUserData] = useState<User>();
  const [cartList, setCartList] = useState<CartList[]>([]);

  const context = useMemo(() => ({ additionalTypenames: ["Users"] }), [user?.signInDetails?.loginId]);

  const [_user] = useTypedQuery({
    query: {
      user: {
        __args: {
          email: user?.signInDetails?.loginId
        },
        id: true,
        full_name: true,
        email: true,
        address: true,
        phone: true,
        coupon: true,
        domain_id: true,
      },
    },
    context
  });

  useEffect(() => {
    if (user?.signInDetails ) {
      setUserData(_user?.data?.user)
    }
  },[user?.signInDetails, _user?.data])

  return (
    <MainContext.Provider
      value={{
        cartList,
        setCartList,
        user,
        userData,
        authStatus,
        signOut,
      }}>
      {children}
    </MainContext.Provider>
  );
};
