import {
  Box,
  Card,
  Container,
  Typography,
  styled
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { DriverRegistrationForm } from "@components/DriverRegistrationForm/DriverRegistrationForm";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
  `
)

const TopWrapper = styled(Box)(
  () =>`
    display: flex;
    with: 100%;
    flex: 1;
    padding: 20px;
  `
)

const DriverRegistration = () => {

  const { t } = useTranslation();

  return(
    <>
      <Helmet>
        <title>{t('Driver Registry')}</title>
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
                  {t('Driver Registration')}
                </Typography>
              </Box>
              <DriverRegistrationForm />
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  )

}

export default DriverRegistration;
