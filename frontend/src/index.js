import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store/index.js";
// import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import "./i18n.js";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import {
  Provider as RollbarProvider,
  ErrorBoundary as ErrorBoundaryProvider,
} from "@rollbar/react";

const rollbarConfig = {
  accessToken: "a7db1e930afb4c3ab5369ddcdc6fab7e",
  payload: {
    environment: "production",
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const root = ReactDOM.createRoot(document.getElementById("chat"));
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundaryProvider>
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <App />
        </Provider>
      </I18nextProvider>
    </ErrorBoundaryProvider>
  </RollbarProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
