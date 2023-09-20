import React, { ReactNode, MouseEvent } from 'react';
import { IconButton, Tooltip } from '@mui/material';

interface ITableActionProps {
  title: string;
  journey?: any
  clickHandler: (e: MouseEvent<HTMLElement>, journey:any) => void;
  visible: boolean;
  icon: ReactNode;
  colors: {
    background: string;
    color: string;
  }
}

export const TableAction = ({title, journey, clickHandler, visible, icon, colors}: ITableActionProps) => {

  console.log("journey", journey);

  return visible && (
    <Tooltip title={title} arrow 
      onClick={(e: MouseEvent<HTMLElement>, journey:any) => clickHandler(e, "hard journey")}>
      <IconButton
        sx={{
          '&:hover': { background: colors.background },
          color: colors.color
        }}
        color="inherit"
        size="small"
        // onClick={clickHandler}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}