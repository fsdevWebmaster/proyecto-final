import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next'
import ScrollTop from './hooks/useScrollTop';
import { App } from '@components';
import { BrowserRouter } from 'react-router-dom';
// import i18n from './i18n/i18n';

const appContainer = document.getElementById('root') as HTMLElement;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(appContainer);

root.render(
  <HelmetProvider>
    {/* <I18nextProvider i18n={i18n}> */}
      <BrowserRouter basename="/">
        <ScrollTop />
        <App />
      </BrowserRouter>
    {/* </I18nextProvider> */}
  </HelmetProvider>
);
