import {
  Box,
  Card,
  Container,
  Typography,
  styled
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { GoalForm } from "@components/GoalForm/GoalForm";

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
    dispaly: flex;
    width: 100%
    flex: 1;
    padding: 20px;
  `
)

const Goal = () => {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('Goal')}</title>
      </Helmet>
      <MainContent>
        <TopWrapper>
          <Container maxWidth='sm'>
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
                  {t('Goal')}
                </Typography>
              </Box>
              <GoalForm />
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  )
}

export default Goal;
