import React, {useContext} from 'react';
import MainRoutes from "./MainRoutes";
import {MainContext} from "./contexts/MainProvider";
import {Authenticator} from "@aws-amplify/ui-react";
import Auth from "./pages/Auth/Auth";
import Loading from "./components/Loader/Loading";

const App = () => {
  const {authStatus, userData} = useContext(MainContext);

  const configuring = "configuring";
  const unauthenticated = "unauthenticated";
  const authenticated = "authenticated";

  return (
    authStatus === configuring || !authStatus || !authStatus ? (
      <Loading />
    ) : authStatus === unauthenticated ? (
      <Auth />
      // <Authenticator>
      //   {({ signOut, user }) => (
      //     <main>
      //       <h1>Hello {user?.username}</h1>
      //       <button onClick={signOut}>Sign out</button>
      //     </main>
      //   )}
      // </Authenticator>
    ) : authStatus === authenticated ? (
      <MainRoutes />
    ) : null
  );
};

export default App;
