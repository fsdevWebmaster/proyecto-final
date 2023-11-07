import React from 'react';
import { Box, SxProps, useTheme } from '@mui/material';

interface IStepProps {
  journeyId: string | null;
  readonly?: boolean;
  children: React.ReactNode;
  sx?: SxProps;
}

export const Step = ({ journeyId, readonly, children, sx }: IStepProps) => {
  const theme = useTheme();

  const backgroundEffect = readonly && journeyId ? undefined : theme.colors.success.light && theme.colors.warning.main;

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      sx={{
        ...sx,
        border: '1px solid',
        backgroundColor: readonly ? '#f3f3f3' : undefined,
        borderColor: readonly ? '#f3f3f3' : theme.colors.success.main,
        borderRadius: '50%',
        '&::before': {
          content: readonly ? 'none' : '" "',
          width: sx ? (sx as any).width : 'auto',
          height: sx ? (sx as any).height : 'auto',
          borderRadius: '50%',
          margin: '0 auto',
          transition: 'all 0.3s',
          animation: 'mymove 2s infinite',
          position: 'absolute',
          backgroundColor: journeyId ? theme.colors.success.light : theme.colors.warning.main, 
        },
        '@-webkit-keyframes mymove': {
          "50%": {
            transform: 'scale(2)',
            opacity: 0,
          },
          "100%": {
            transform: 'scale(2)',
            opacity: 0,
          }
        }
      }}
    >
      {children}
    </Box>    
  );
};