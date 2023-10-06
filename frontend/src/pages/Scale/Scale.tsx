import { SearchForm } from "@components/Search/SearchForm"
import { PageLayout } from "@layouts/Page/PageLayout"
import { Box, Button, Card, Grid, IconButton, TextField, Typography, styled, useTheme } from "@mui/material"
import { SearchItem } from '../../components/Search/useSearch';
import { useTranslation } from "react-i18next";
import { ChangeEvent, useEffect, useState } from "react";
import { ContainerModel, JourneyLog } from "@models";
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from "react-router";
import { journeyApi } from "@services/api/journeyApi";
import { JourneyModel } from "@models/Journey/Journey";
import { StepModel } from "@models/Step/Step";
import { MxStepStore } from "@stores";
import { toJS } from "mobx";

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
  const location = useLocation()
  const [scaleType, setScaleType] = useState<string | null>()
  const [scaleTitle, setScaleTitle] = useState<string | null>()
  const [selectedContainer, setSelectedContainer] = useState<ContainerModel | null>()
  const [selectedWeight, setSelectedWeight] = useState<number | null>()
  const [weight, setWeight] = useState(0)
  const [validWeight, setValidWeight] = useState(false)
  const [journey, setJourney] = useState<JourneyModel | undefined>(undefined)
  const [actualStep, setActualStep] = useState<StepModel | undefined>(undefined)
  const [actualStepsList, setActualStepsList] = useState<StepModel[]>([])
  const [journeyLog, setJourneyLog] = useState<JourneyLog | undefined>()


  const handleSelected = async (selected:SearchItem) => {
    setSelectedContainer(selected as ContainerModel)
    // get journey
    try {
      const journeyResp = await journeyApi.getJourneyByContainerNumber(selected.containerNumber)
      const journey = journeyResp.data

      setJourney(journey)
      if(journey && actualStep) {
        const journeyLog = await journeyApi.getJourneyLog(journey, actualStep)
        setJourneyLog(journeyLog.data)
      }
      else {
        console.log('Error: there is no container with that number in this step')
      }
    } catch (error) {
      console.log("TODO: Error handling:", error)
    }
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

  const continueJourney = async () => {
    if(journey && journeyLog) {
      const patchData = {
        journey: journey.id,
        step: journeyLog.step,
        value: selectedWeight
      }
      const updated = await journeyApi.updateJourney(patchData)
      setSelectedContainer(null)
      setSelectedWeight(null)
    }
  }

  useEffect(() => {
    const { stepsList } = MxStepStore
    const scaleType = location.pathname.split("/").pop()

    if (scaleType) {
      const list = toJS(stepsList);
      const actualStep = list.find(step => step.routeName === scaleType )

      setScaleType(scaleType)
      setActualStepsList(list)
      setActualStep(actualStep)
      
      switch (scaleType) {
        case "scale-one":
          setScaleTitle("Scale one")          
        break;
        case "scale-two":
          setScaleTitle("Scale two")
        break;
      }      
    }
  }, [])
  

  return (
    <PageLayout
      seoTitle='Scale dashboard'
      title={scaleTitle as string}
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