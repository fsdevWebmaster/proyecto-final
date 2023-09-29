import React, { useState } from 'react';
// import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';

// import reactLogo from '../assets/react.svg';
// import viteLogo from '/vite.svg';
// import '../styles/App.css';
// import { ThemeProvider } from '@mui/material';
// import theme from '../styles/theme';
// import { RoutesApp } from '../routes/Routes';

/*export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <RoutesApp />
      </Router>
    </ThemeProvider>
  );
}*/

import { useRoutes } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ThemeProvider from '@styles/theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { routes } from '../routes/routes';
import '@helpers/i18n';
import { Provider } from 'mobx-react';

export const App = () => {
  const content = useRoutes(routes);

  return (
    <Provider>
      <ThemeProvider>
        <SnackbarProvider
          maxSnack={6}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <CssBaseline />
          {content}
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};
