import React from 'react';
import { Scrollbar } from '@components/Scrollbar/Scrollbar';
import { Timeline } from '@mui/lab';
import { Box, SxProps } from '@mui/material';
import { JourneyLog } from '@models/Journey/Log';
import { LogItem } from './LogItem';

interface ITimelineLogProps {
  sx?: SxProps;
  logs: JourneyLog[];
}

export const TimelineLog = ({sx, logs}: ITimelineLogProps) => {
  return (
    <Box className="timeline-log" sx={{...sx}}>
      <Scrollbar>
        <Timeline>
          {logs.length ? logs.map((log: JourneyLog, index: number) => (
            <LogItem log={log} status='success' key={`item-${index}`}/>
          )) : null}
        </Timeline>
      </Scrollbar>
    </Box>
  );
}