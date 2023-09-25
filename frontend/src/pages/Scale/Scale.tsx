import { SearchForm } from "@components/Search/SearchForm"
import { PageLayout } from "@layouts/Page/PageLayout"
import { Box, Button, Card, Grid, IconButton, TextField, Typography, styled, useTheme } from "@mui/material"
import { SearchItem } from '../../components/Search/useSearch';
import { useTranslation } from "react-i18next";
import { ChangeEvent, useState } from "react";
import { ContainerModel } from "@models";
import DeleteIcon from '@mui/icons-material/Delete';

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

export const Scale = () => {
  const { t } = useTranslation();
  const theme = useTheme()
  const [selectedContainer, setSelectedContainer] = useState<ContainerModel | null>()
  const [weight, setWeight] = useState(0)
  const [selectedWeight, setSelectedWeight] = useState<number | null>()
  const [validWeight, setValidWeight] = useState(false)


  const mockJourneyLog = {
    "journey": "65007586b6efe051c2e1217d",
    "step": "64f7a18ceb2116cb79ca7449",
    "stepValue": null,
    "user": "64da7c0f484e531a6eeebbfc",
    "id": "6500782aa4a2b886e672e26f",
  }    
      
  const handleSelected = (selected:SearchItem) => {
    setSelectedContainer(selected as ContainerModel)
  }

  const deleteSelected = (type:string) => {
    switch (type) {
      case "container":
        setSelectedContainer(null)
      break;
      case "weight":
        setWeight(0)
        setSelectedWeight(null)
      break;
    }
  }

  const handleWeight = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { value } = e.target
    if (Number(value) > 0) {
      setWeight(Number(value))
      setValidWeight(true)
    }
  }

  const handleData = () => {
    if (weight) {
      setSelectedWeight(weight)
      setValidWeight(true)
    }
  }

  const continueJourney = () => {
    const patchData = {
      journey: mockJourneyLog.id,
      step: mockJourneyLog.step,
      value: selectedWeight
    }

    console.log("TODO: Patch to /journey", patchData)

  }


  return (
    <PageLayout
      seoTitle='Scale dashboard'
      title='Scale dashboard'
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
                  <IconButton edge="end" onClick={() => deleteSelected('container')}>
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

        { !selectedWeight && selectedContainer && 
          <>
            <TextField sx={{ mb: 1 }}
              variant='outlined'
              label={t('Weight')}
              name="seachField" 
              onChange={handleWeight}
              fullWidth
              type="number"
            />
            { validWeight &&
              <Button onClick={handleData}>
                {t('Set weight')}
              </Button>
            }
          </>
        }

        { selectedWeight && selectedWeight !== 0 &&
          <InfoContainer sx={{ marginTop: 1 }}>
            <Typography variant="h4">
              {`${t('Weight')}`}
            </Typography>
            <Card sx={{ padding: 2, marginBottom: 2, marginTop: 1 }}>
              <MainRow className="main-row">
                  <Typography variant="h4" width="50%">
                    {selectedWeight}
                  </Typography>
                  <IconButton edge="end" onClick={() => deleteSelected('weight')}>
                    <DeleteIcon sx={{ color: theme.colors.primary.dark }} />
                  </IconButton>
              </MainRow>
            </Card>
            { selectedContainer &&
              <Button onClick={continueJourney}>
                {`${t('Continue journey')}`}
              </Button>
            }
          </InfoContainer>
        }
      </MainContent>
    </PageLayout>
  )
}