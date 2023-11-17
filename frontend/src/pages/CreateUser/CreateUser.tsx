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
import { PageLayout } from '@layouts/Page/PageLayout';

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
    <PageLayout
    seoTitle={t('Users List')}
    title={t('Users Management')}
    buttonConfig={{
      visible: false, 
      title: t('Create User')
    }}>
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
              <CreateUserForm />
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </PageLayout>
  );
}

export default CreateUser;
