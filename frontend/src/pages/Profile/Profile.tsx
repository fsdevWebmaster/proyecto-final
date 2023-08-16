import { ProfileForm } from '@components/ProfileForm/ProfileForm';
import {
  Box,
  Card,
  Container,
  Typography,
  styled
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const MainContent = styled(Box)(
  () =>`
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: colum;
  `
)

const TopWrapper = styled(Box)(
  () =>`
    display: flex;
    width: 100%;
    flex: 1;
    padding: 20px;
  `
)

const Profile = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('Profile User')}</title>
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
                  {t('Profile User')}
                </Typography>
              </Box>
              <ProfileForm />
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  )
};

export default Profile
