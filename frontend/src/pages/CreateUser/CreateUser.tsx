import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  Typography,
  Container,
  styled
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { CreateUserForm } from '@components/CreateUserForm/CreateUserForm';

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

const CreateUser = () => {
  // const { method } = useAuth() as any;
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('Create User')}</title>
      </Helmet>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="sm">
            <Card
              sx={{
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
                  {t('Register User')}
                </Typography>
                {/* <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3
                  }}
                >
                  {t('Fill in the fields below to sign into your account.')}
                </Typography> */}
              </Box>
              <CreateUserForm />
              {/* <Box my={4}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  fontWeight="bold"
                >
                  {t('Don’t have an account, yet?')}
                </Typography>{' '}
                <Link component={RouterLink} to="/account/register-basic">
                  <b>Sign up here</b>
                </Link>
              </Box> */}
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default CreateUser;
