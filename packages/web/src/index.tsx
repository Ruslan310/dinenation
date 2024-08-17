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
import {colorTheme} from "./utils/theme";

Amplify.configure(awsExports);

const urql = createClient({
  url: import.meta.env.VITE_GRAPHQL_URL,
  exchanges: [cacheExchange, fetchExchange],
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UrqlProvider value={urql}>
      <Authenticator.Provider>
        <MainProvider>
          <ConfigProvider
            theme={{
              token: {
                colorPrimaryHover: colorTheme.primary,
                colorPrimary: colorTheme.primary,
              }}}
          >
            <App />
          </ConfigProvider>
        </MainProvider>
      </Authenticator.Provider>
    </UrqlProvider>
  </React.StrictMode>
);
