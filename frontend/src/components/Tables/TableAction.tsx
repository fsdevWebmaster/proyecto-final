import React, { ReactNode, MouseEvent } from 'react';
import { IconButton, Tooltip } from '@mui/material';

interface ITableActionProps {
  title: string;
  clickHandler: (event: MouseEvent<HTMLElement>) => void;
  visible: boolean;
  icon: ReactNode;
  colors: {
    background: string;
    color: string;
  }
}

export const TableAction = ({title, clickHandler, visible, icon, colors}: ITableActionProps) => {
  return visible && (
    <Tooltip title={title} arrow>
      <IconButton
        sx={{
          '&:hover': { background: colors.background },
          color: colors.color
        }}
        color="inherit"
        size="small"
        onClick={clickHandler}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}