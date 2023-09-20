import React, { ReactNode, MouseEvent } from 'react';
import { IconButton, Tooltip } from '@mui/material';

interface ITableActionProps {
  title: string;
  clickHandler: (e: MouseEvent<HTMLElement>) => void;
  visible: boolean;
  icon: ReactNode;
  colors: {
    background: string;
    color: string;
  }
}

export const TableAction = ({title, clickHandler, visible, icon, colors}: ITableActionProps) => {
  return visible && (
    <Tooltip title={title} arrow 
      onClick={(e: MouseEvent<HTMLElement>) => clickHandler(e)}>
      <IconButton
        sx={{
          '&:hover': { background: colors.background },
          color: colors.color
        }}
        color="inherit"
        size="small"
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}