import React from 'react';
import { useRoutes } from 'react-router-dom';
import ThemeProvider from '@styles/theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { routes } from '../routes/routes';
import '@helpers/i18n';
import { ErrorBoundary } from './ErrorBoundary';
import { BaseDialog } from './Dialog/BaseDialog';

export const App = () => {
  const content = useRoutes(routes);

  return (
    <ThemeProvider>
      <SnackbarProvider
        maxSnack={6}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <CssBaseline />
        <ErrorBoundary>
          {content}
        </ErrorBoundary>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
