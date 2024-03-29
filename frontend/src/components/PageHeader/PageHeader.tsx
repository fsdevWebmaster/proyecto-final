import React from 'react';
import { IPageHeaderProps } from '@common/interfaces'
import { Avatar, Box, Typography, alpha, lighten, styled } from '@mui/material';

const AvatarPageTitle = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      color: ${theme.colors.primary.main};
      margin-right: ${theme.spacing(2)};
      background: ${
        theme.palette.mode === 'dark'
          ? theme.colors.alpha.trueWhite[10]
          : theme.colors.alpha.white[50]
      };
      box-shadow: ${
        theme.palette.mode === 'dark'
          ? '0 1px 0 ' +
            alpha(lighten(theme.colors.primary.main, 0.8), 0.2) +
            ', 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)'
          : '0px 2px 4px -3px ' +
            alpha(theme.colors.alpha.black[100], 0.4) +
            ', 0px 5px 16px -4px ' +
            alpha(theme.colors.alpha.black[100], 0.2)
      };
`
);

export const PageHeader = ({title, subtitle, icon, sx}: IPageHeaderProps) => {
  return (
    <Box
      display="flex"
      alignItems={{ xs: 'stretch', md: 'center' }}
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={sx}>
        <Box display="flex" alignItems="center">
          {icon && (
            <AvatarPageTitle variant="rounded">
              {icon}
            </AvatarPageTitle>)
          }

          <Box>
            <Typography className="lineUp" variant="h3" component="h3" gutterBottom>{title}</Typography>
            {subtitle && (<Typography variant="subtitle2">{subtitle}</Typography>)}
          </Box>         
        </Box>       
      </Box>
  );
}