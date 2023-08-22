import {
    Box,
    Card,
    Container,
    Typography,
    styled
} from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { AdminDashboardForm } from '@components/AdminForm/AdminDashboardForm'

const MainContent = styled(Box)(
  () =>`
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
  `
)

const TopWrapper = styled(Box)(
  () =>`
    display: flex;
    width: 100%;
    flex: 1;
    padding: 20px
  `
)

const AdminDashboard = () => {
  
  const { t } = useTranslation()

  return(
    <>
      <Helmet>
        <title>{t('Admin Dashboard')}</title>
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
                  variant='h2'
                  sx={{
                    mb: 1
                  }}
                >
                  {t('Administrator')}
                </Typography>
              </Box>
              <AdminDashboardForm />
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  )
}

export default AdminDashboard;
