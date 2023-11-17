import { ReactElement, forwardRef, Ref } from 'react';
import { styled, Dialog, Box, Typography, Slide, Button, Avatar, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { TransitionProps } from '@mui/material/transitions';
import { ButtonConfig } from '@common/interfaces';

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarIcon = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

interface IConfirmationDialogProps {
  isOpen: boolean;
  type: 'error' | 'info' | 'success' | 'warning';
  configBtn: ButtonConfig[];
  onCloseHandler?: () => void;
  header: string;
}

export const CustomDialog = ({isOpen, type, configBtn, onCloseHandler, header}: IConfirmationDialogProps) => {
  const theme = useTheme();

  const IconType = () => {
    switch(type) {
      case 'error':
        return <DeleteIcon />;

      case 'success':
        return <CheckCircleOutlineIcon />

      case 'info':
        return <InfoIcon />

      default:
        return <WarningIcon />
    }
  }

  return (
    <DialogWrapper
      open={isOpen}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      keepMounted
      onClose={onCloseHandler}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        p={5}
      >
        <AvatarIcon sx={{
          backgroundColor: theme.colors[type].lighter,
          color: theme.colors[type].main
        }}>
          <IconType />
        </AvatarIcon>

        <Typography
          align="center"
          sx={{
            py: 4,
            px: 6
          }}
          variant="h4"
        >
          {header}
        </Typography>

        <Box display="flex" className="btn-container" width={1} justifyContent="flex-end">
          {configBtn.map((btn: ButtonConfig, index: number) => (
            <Button
              size='medium'
              onClick={btn.action}
              key={`btn-${index}`}
              sx={btn.sx}
              variant='contained'
            >
              {btn.title}
            </Button>
          ) )}
        </Box>
    </Box>
  </DialogWrapper>    
  );
}