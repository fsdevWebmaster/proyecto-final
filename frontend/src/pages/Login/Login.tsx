import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  Typography,
  Container,
  styled,
  Avatar
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { LoginForm } from '@components'
import { useTranslation } from 'react-i18next';
import CardItem from '@components/Cards/CardItem';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';

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

const BottomWrapper = styled(Box)(
  ({ theme }) => `
    padding: ${theme.spacing(3)};
    display: flex;
    align-items: center;
    justify-content: center;
`
);

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
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

const AvatarLogin = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.primary.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const Login = () => {
  
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('pages.login.title')}</title>
      </Helmet>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="sm">
            <Card
              sx={{
                mt: 3,
                px: 4,
                pt: 5,
                pb: 3
              }}
            >
              <Box display="flex" alignItems="center" flexDirection="row" justifyContent="space-between">
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1
                  }}
                >
                  {t('pages.login.header')}
                </Typography>
                  <AvatarLogin variant='rounded'>
                    <EmojiTransportationIcon fontSize="large"/>
                  </AvatarLogin>
              </Box>
              <LoginForm />
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default Login;
