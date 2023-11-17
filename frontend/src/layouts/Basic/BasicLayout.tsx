import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

const BasicLayout = () => {
  const theme = useTheme();

  return (
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
        boxShadow: theme.colors.shadows.warning
      }
    }}
  >
    <Outlet />
  </Box>    
  );
};

export default BasicLayout;