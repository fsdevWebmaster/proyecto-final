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
import { SearchFrom } from "@components/Search/SearchForm";
import { ContainerModel } from "@models/Container/Container";
import { useState } from "react";
import { useSearch } from "@components/Search/useSearch";


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
  const { handleSearchItem, containers } = useSearch();
  const { t } = useTranslation()
  const [selectedContainer, setSelectedContainer] = useState<ContainerModel | null>()

  const handleContainer = (container:ContainerModel) => {
    setSelectedContainer(container)
  }

  return (
    <>
      <Helmet>
        <title>{t('Portería')}</title>
      </Helmet>
      <MainContent>
        <TopWrapper>
          <Container maxWidth='sm'>
            <Card
              sx={{
                px: 5,
                pt: 4,
                pb: 5
              }}
            >
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1
                  }}
                >
                  {t('Portería')}
                </Typography>
              </Box>
              { selectedContainer && 
                <Box pb={2}>
                  <Typography
                    variant="h4"
                  >
                    Contenedor: { selectedContainer.containerNumber }
                  </Typography>
                </Box>
              }
              <SearchFrom 
                searchType="containers"
                sendSelected={(container) => handleContainer(container)} 
              />
              <GoalForm />
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  )
}

export default Goal;
