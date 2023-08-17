import {
  Box,
  Card,
  Container,
  Typography,
  styled
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { ContainerRegistryForm } from "@components/ContainerRegistrationForm/ContainerRegistrationForm";

const MainContent = styled(Box)(
  () => `
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

const ContainerRegistry = () => {

  const { t } = useTranslation();

  return(
    <>
      <Helmet>
        <title>{t('Container Registry')}</title>
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
                  {t('Container Registry')}
                </Typography>
              </Box>
              <ContainerRegistryForm />
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  )
}

export default ContainerRegistry;
