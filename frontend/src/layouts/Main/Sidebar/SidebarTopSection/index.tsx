import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Avatar,
  Box,
  Typography,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { MxUserStore, MxLoginStore } from '@stores';

export const SidebarTopSection = observer(() => {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();
  const { userInfo } = MxUserStore;

  const navigate = useNavigate();
  const location = useLocation();
  // const { user, logout } = useAuth();

  const currentRole = userInfo?.roles.length ? userInfo.roles[0].role : '';

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      handleClose();
      await MxLoginStore.logOut(userInfo?.id!);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        mx: 2,
        pt: 1,
        position: 'relative'
      }}
    >
      <Avatar
        sx={{
          width: 68,
          height: 68,
          mb: 2,
          mx: 'auto'
        }}
      >
        {userInfo?.avatar}
      </Avatar>

      <Typography
        variant="h4"
        sx={{
          color: `${theme.colors.alpha.trueWhite[100]}`
        }}
      >
        {userInfo?.name}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: `${theme.colors.alpha.trueWhite[70]}`
        }}
      >
        {currentRole}
      </Typography>

    </Box>
  );
})
