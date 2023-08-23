import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  Typography,
  Container,
  styled
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { LoginForm } from '@components'
import { useTranslation } from 'react-i18next';

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
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1
                  }}
                >
                  {t('pages.login.header')}
                </Typography>
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
