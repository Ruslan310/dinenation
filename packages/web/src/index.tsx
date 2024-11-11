import React from "react";
import ReactDOM from "react-dom/client";
import {
  createClient,
  cacheExchange,
  fetchExchange,
  Provider as UrqlProvider,
} from "urql";
import "./globals.css";
import {MainProvider} from "./contexts/MainProvider";
import {Amplify} from 'aws-amplify';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import App from "./App";
import {Authenticator} from "@aws-amplify/ui-react";
import {ConfigProvider} from "antd";
import {colorTheme, statusColorIcon} from "./utils/theme";

Amplify.configure(awsExports);

const urql = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL,
  exchanges: [cacheExchange, fetchExchange],
});

const antTheme = {
  components: {
    Modal: {
      contentBg: colorTheme.navbar
    },
    Table: {
      rowHoverBg: statusColorIcon.processing,
      headerBg: colorTheme.navbar
    },
    Menu: {
      itemSelectedBg: colorTheme.navbar,
      itemActiveBg: colorTheme.navbar,
      itemSelectedColor: colorTheme.darkPrimary,
      dangerItemHoverColor: colorTheme.primary,
      dangerItemColor: colorTheme.primary,
      dangerItemActiveBg: colorTheme.primary,
      dangerItemSelectedColor: colorTheme.primary,
      dangerItemSelectedBg: colorTheme.navbar,
      itemBg: colorTheme.navbar,
      lineWidth: 0
    },
  },
  token: {
    colorPrimaryHover: colorTheme.primary,
    colorPrimary: colorTheme.primary,
  }}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UrqlProvider value={urql}>
      <Authenticator.Provider>
        <ConfigProvider theme={antTheme}>
          <MainProvider>
            <App />
          </MainProvider>
        </ConfigProvider>
      </Authenticator.Provider>
    </UrqlProvider>
  </React.StrictMode>
);
