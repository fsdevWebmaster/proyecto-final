/*import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import './styles/index.css';*/

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import ScrollTop from './hooks/useScrollTop';
import { App } from '@components';
import { BrowserRouter } from 'react-router-dom';

const appContainer = document.getElementById('root') as HTMLElement;
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(appContainer);

root.render(
  <HelmetProvider>
    <BrowserRouter basename="/">
      <ScrollTop />
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

/*ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);*/
