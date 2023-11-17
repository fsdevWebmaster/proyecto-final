import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Container,
  styled,
  Avatar,
  useTheme
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { LoginForm } from '@components'
import { useTranslation } from 'react-i18next';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { MxLoginStore } from '@stores';
import { LoginDriver } from '@components/LoginForm/LoginDriver';

const CardImg = styled(Card)(
  ({ theme }) => `
    width: 90px;
    height: 80px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: ${theme.colors.alpha.white[100]};
    margin: 0 ${theme.spacing(1)};
    border: 1px solid ${theme.colors.alpha.black[10]};
    transition: ${theme.transitions.create(['all'])};

    &:hover {
      border-color: ${theme.colors.primary.main};
    }
`
);

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    background: ${theme.colors.gradients.blue3};
`
);

const TopWrapper = styled(Box)(
  () => `
  display: flex;
  width: 100%;
  flex: 1;
  padding: 20px;
`
);

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.primary.main};
      color: ${theme.palette.getContrastText(theme.colors.primary.main)};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.primary};
`
);

const AvatarWarning = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.warning.main};
      color:  ${theme.palette.primary.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.warning};
`
);

const Login = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [AmIUser, setImUser] = useState(false);
  const [AmIDriver, setImDriver] = useState(false);
  const [title, setTitle] = useState(null);
  const date = new Date();

  const handleUser = useCallback(() => {
    setImUser(!AmIUser);
    setImDriver(false);
    setTitle(t('User'));
  }, [AmIUser, title]);

  const handleDriver = useCallback(() => {
    setImDriver(!AmIDriver);
    setImUser(false);
    setTitle(t('Driver'));
  }, [AmIDriver, title]);

  useEffect(() => {
    // Reset user authentication
    MxLoginStore.resetAuth();
    MxLoginStore.setSession(null, false);  
  }, []);

  useEffect(() => {
    if (!AmIDriver && !AmIUser) setTitle(null);
  }, [AmIDriver, AmIUser]);

  return (
    <>
      <Helmet>
        <title>{t('pages.login.title')}</title>
      </Helmet>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="sm" sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 200,
          }}>
            <Card
              className='Login'
              sx={{
                mt: 3,
                mb: 3,
                px: 4,
                pt: 5,
                pb: 5,
                width: 'inherit'
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  mb: 1,
                  textAlign: 'center'
                }}
              >
                {t('Login {{as}}', {as: title})}
              </Typography>              
              <Box
                display="flex"
                width={1}
                alignItems="center"
                justifyContent="space-around"
                sx={{
                  '& .MuiAvatar-root': {
                    transition: 'transform .5s ease-in',
                    ':hover': {
                      transform: 'scale(1.2)',
                    }
                  }
                }}
              >
                <AvatarPrimary variant='rounded' alt={t('Login as User')} onClick={handleUser} sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column'}}>
                  <AssignmentIndIcon fontSize="large"/>
                  <Typography>{t('User')}</Typography>
                </AvatarPrimary>
                <AvatarWarning variant='rounded' alt={t('Login as Driver')} onClick={handleDriver} sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column'}}>
                  <LocalShippingIcon fontSize="large"/>
                  <Typography>{t('Driver')}</Typography>
                </AvatarWarning>                
              </Box>
              {AmIUser && <LoginForm />}
              {AmIDriver && <LoginDriver />}
            </Card>
            <Typography color={theme.colors.info.light} mt={5}>{t(`Copyright FFJD, ${date.getFullYear()}`)}</Typography>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default Login;
