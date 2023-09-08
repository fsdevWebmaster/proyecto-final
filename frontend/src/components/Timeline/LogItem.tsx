import React from 'react';
import { TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab';
import { Box, Typography, styled, useTheme } from '@mui/material';
import { JourneyLog } from '@models/Journey/Log';

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(10)};
    font-weight: bold;
    text-transform: uppercase;
    border-radius: ${theme.general.borderRadiusSm};
    padding: ${theme.spacing(0.5, 1)};
  `
);

interface ILogItemProps {
  log: JourneyLog;
  status: 'success' | 'error' | 'warning',
}

export const LogItem = ({log, status}: ILogItemProps) => {
  const theme = useTheme();
  
  return (
    <TimelineItem
    sx={{
      p: 0
    }}
    >
      <TimelineOppositeContent
        sx={{
          width: 118,
          flex: 'none',
          textAlign: 'left'
        }}
        color="text.secondary"
      >
        {log.step}
      </TimelineOppositeContent>
      <TimelineSeparator
        sx={{
          position: 'relative'
        }}
      >
        <TimelineDot
          sx={{
            marginTop: 0,
            top: theme.spacing(1.2)
          }}
          variant="outlined"
          color="primary"
        />
        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent
        sx={{
          pb: 4
        }}
      >
        <LabelWrapper
          component="span"
          sx={{
            background: `${theme.colors[status].main}`,
            color: `${theme.palette.getContrastText(
              theme.colors[status].dark
            )}`
          }}
        >
          {log.status}
        </LabelWrapper>
        <Typography
          sx={{
            pt: 1
          }}
          variant="body2"
          color="text.primary"
        >
          <b>{log.value}</b>
        </Typography>
      </TimelineContent>
    </TimelineItem>    
  );
}