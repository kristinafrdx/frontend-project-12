import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  Provider as RollbarProvider,
  ErrorBoundary as ErrorBoundaryProvider,
} from '@rollbar/react';
import { Provider } from 'react-redux';
import './i18n.js';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import store from './store/index.js';
import App from './App';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_MY_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundaryProvider>
      <I18nextProvider i18n={i18next}>
        <Provider store={store}>
          <App />
        </Provider>
      </I18nextProvider>
    </ErrorBoundaryProvider>
  </RollbarProvider>,
);
