import { SearchForm } from "@components/Search/SearchForm"
import { PageLayout } from "@layouts/Page/PageLayout"
import { ContainerModel } from "@models"
import { Box, Button, Card, IconButton, Typography, styled, useTheme } from "@mui/material"
import { useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { SearchItem } from "@components/Search/useSearch"
import { useTranslation } from "react-i18next"
import { JourneyModel } from "@models/Journey/Journey"

const MainContent = styled(Box)(
  () =>`
      width: 100%;
      margin-left: 5%;
      margin-top: 1em;
      display: flex;
      flex: 1;
      flex-direction: column;
  `
)

const MainRow = styled(Box)(
  () => `
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  `
)

const SearchContainer = styled(Box)(
  () => `
    width: 100%;
    margin-bottom: 1em;
  `
)

const InfoContainer = styled(Box)(
  () => `
    margin-top: 1em;
  `
)

const mockJourney = {
  driver: "64dbeb400422576f15717ada",
  container: "64dc0fe53ad970d6e4d9c951",
  step: {
    name: "Patio",
    order: 2,
    previous: "64f7a092eb2116cb79ca7445",
    next: "64f7a18ceb2116cb79ca7449",
    isActive: true,
    id: "64f7a10aeb2116cb79ca7447"
  },
  containerNumber: "001",
  driverDoc: "1111",
  id: "65007586b6efe051c2e1217d"
}

const mockStep = {
  name: "Exit",
  order: 1,
  previous: null,
  next: "64f7a10aeb2116cb79ca7447",
  isActive: true,
  id: "64f7a092eb2116cb79ca7445"
}

export const Exit = () => {
  const [selectedContainer, setSelectedContainer] = useState<ContainerModel | null>()
  const theme = useTheme()
  const {t} = useTranslation()

  const handleSelected = (selected:SearchItem) => {
    setSelectedContainer(selected as ContainerModel)
  }

  const deleteSelected = () => {
    setSelectedContainer(null)
  }

  const handleFinished = () => { 
    const patchData = {
      journeyId: mockJourney.id,
      step: mockStep.id,
      value: null
    }
    
    console.log("TODO: Patch to /journey", patchData)
  }
  const handleBackToYard = () => { 
    const patchData = {
      journeyId: mockJourney.id,
      step: mockStep.id,
      value: null
    }
    console.log("TODO: Patch to /journey", patchData)
  }

  return (
    <PageLayout
      seoTitle={t('Exit')}
      title={t('Exit')}
      buttonConfig={{
        visible: false, 
        title: '', 
        action: () => alert('To-do')}
    }>
      <MainContent className="main-content" sx={{ marginTop: 2 }}>
        { selectedContainer && 
          <InfoContainer>
            <Typography variant="h4">
              {`${t('Container')}`}
            </Typography>
            <Card sx={{ padding: 2, marginBottom: 2, marginTop: 1 }}>
              <MainRow className="main-row">
                  <Typography variant="h4" width="50%">
                    <span>{selectedContainer?.containerNumber}</span>
                  </Typography>
                  <IconButton edge="end" onClick={() => deleteSelected()}>
                    <DeleteIcon sx={{ color: theme.colors.primary.dark }} />
                  </IconButton>
              </MainRow>
            </Card>
          </InfoContainer>
        }

        { !selectedContainer && 
          <SearchContainer>
            <SearchForm
              sendSelected={(selected) =>handleSelected(selected)}
              searchType="containers"
              formTitle={t("Seach containers")}
            />
          </SearchContainer>
        }
        { selectedContainer &&
          <Button onClick={handleFinished}>
            {t('Finished')}
          </Button>
        }
        { selectedContainer &&
          <Button onClick={handleBackToYard}>
            {t('Back to yard')}
          </Button>
        }
      </MainContent>
    </PageLayout>
  )
}