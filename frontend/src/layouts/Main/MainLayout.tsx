import { FC, ReactNode, useCallback, useEffect } from 'react';
import { Box, alpha, lighten, useTheme } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
// import ThemeSettings from './ThemeSettings'; keep it for later

import { Header } from './Header';
import { Sidebar } from './Sidebar/Sidebar';
import { MxConfigStore, MxStepStore } from '@stores';
import { PageHelper } from '@helpers/pageHelper';
import { observer } from 'mobx-react';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = () => {
  const theme = useTheme();
  const location = useLocation();

  const setCurrentPage = useCallback(() => {
    const findPage = PageHelper.findPageByPath(location.pathname);
    if (findPage) {
      MxConfigStore.setCurrentPage(findPage);
    }
  }, []);

  useEffect(() => {
    const globalSteps = async() => {
      const steps = await MxStepStore.handleSteps();

      if(steps.data) {
        MxStepStore.setStepsList(steps.data);
      }
    }
    
    globalSteps();
    setCurrentPage();
  }, []);  

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%',

          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05
                  )}`
          }
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`
            }
          }}
        >
          <Box display="block">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default observer(MainLayout);
