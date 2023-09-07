import React from 'react';
import { Box, ListItemText, Typography, useTheme } from '@mui/material';
import { Text } from '@components/Text/Text';
import { ProgressFactory } from './ProgressFactory';

interface IProgressBarProps {
  header?: string;
  type: 'error' | 'warning' | 'success' | 'secondary';
  percentage: number;
  status: string;
  currentLocation: string;
}

export const ProgressBar = ({header, type, percentage, status, currentLocation}: IProgressBarProps) => {
  const theme = useTheme();

  const ProgressFactoryBar = ProgressFactory(type);
  
  return (
    <ListItemText
      disableTypography
      primary={ header ? (
        <Typography color="text.primary" variant="h5">
          {header}
        </Typography>) : null
      }
      secondary={
        <>
          <ProgressFactoryBar
            sx={{
              mt: 1,
              mb: 0.5
            }}
            variant="determinate"
            value={percentage}
          />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              sx={{
                fontSize: `${theme.typography.pxToRem(12)}`
              }}
              variant="subtitle2"
            >
              <Text color={type}>{status}</Text>
            </Typography>
            <Typography
              sx={{
                fontSize: `${theme.typography.pxToRem(12)}`
              }}
              variant="subtitle2"
            >
              {currentLocation}
            </Typography>
          </Box>
        </>
      }
    />
  );
}