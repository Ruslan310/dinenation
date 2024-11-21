import React, {useContext} from 'react';
import MainRoutes from "./MainRoutes";
import {MainContext} from "./contexts/MainProvider";
import Auth from "./pages/Auth/Auth";
import LogoLoader from "./components/LogoLoader/LogoLoader";

const App = () => {
  const {authStatus, userData} = useContext(MainContext);

  const configuring = "configuring";
  const unauthenticated = "unauthenticated";
  const authenticated = "authenticated";

  if (authStatus === configuring || !authStatus || (authStatus === authenticated && !userData?.email)) {
    return <LogoLoader />;
  }

  if (authStatus === unauthenticated) {
    return <Auth />;
  }

  if (authStatus === authenticated) {
    return <MainRoutes />;
  }

  return null;
};

export default App;
