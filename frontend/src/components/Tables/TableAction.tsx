import { ReactNode, MouseEvent } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import { Journey } from '@models/Journey/Journey';

interface ITableActionProps {
  title: string;
  name?: string
  journey: Journey;
  clickHandler: (e: MouseEvent<HTMLElement>, name:string, journey:Journey) => void;
  visible: boolean;
  icon: ReactNode;
  iconText?: string;
  colors: {
    background: string;
    color: string;
  }
}

export const TableAction = ({title, name, clickHandler, visible, icon, colors, iconText, journey}: ITableActionProps) => {
  return visible && (
    <Tooltip title={title} arrow 
      onClick={(e: MouseEvent<HTMLElement>, name: string, journey: Journey) => clickHandler(e, name, journey)}>
      <IconButton
        sx={{
          '&:hover': { background: colors.background },
          color: colors.color
        }}
        color="inherit"
        size="small"
        // onClick={clickHandler}
      >
        <Typography pr={2}>
          {iconText}
        </Typography>
        {icon}
      </IconButton>
    </Tooltip>
  );
}