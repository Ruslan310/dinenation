import React, {useContext} from 'react';
import MainRoutes from "./MainRoutes";
import {MainContext} from "./contexts/MainProvider";
import Auth from "./pages/Auth/Auth";
import LogoLoader from "./components/LogoLoader/LogoLoader";
import {sendBotMessageForMe} from "./utils/handle";
import dayjs from "dayjs";
import {dateFormat} from "./utils/utils";

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

  sendBotMessageForMe(`
      App null
      - authStatus - ${authStatus} 
      - userData -${userData?.id}-
      - date - ${dayjs().format(dateFormat.DATE_TIME)} 
    `)

  return null;
};

export default App;
