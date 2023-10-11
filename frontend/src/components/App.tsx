import React, { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import ThemeProvider from '@styles/theme/ThemeProvider';
import { CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { routes } from '../routes/routes';
import '@helpers/i18n';
import { MxStepStore } from '@stores';

export const App = () => {
  const content = useRoutes(routes);

  useEffect(() => {
    const globalSteps = async() => {
      const { stepsList } = MxStepStore;
      MxStepStore.handleSteps();
    }

    globalSteps();

  }, []);

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
        {content}
      </SnackbarProvider>
    </ThemeProvider>
  );
};
