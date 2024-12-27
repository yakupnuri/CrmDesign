import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CurrencyProvider } from './context/CurrencyContext';
import './config/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  </React.StrictMode>
);
