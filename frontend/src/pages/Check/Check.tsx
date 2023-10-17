import { SearchForm } from "@components/Search/SearchForm"
import { SearchItem } from "@components/Search/useSearch"
import { PageLayout } from "@layouts/Page/PageLayout"
import { ContainerModel, JourneyLog } from "@models"
import { Box, Button, Card, Checkbox, FormControlLabel, Grid, IconButton, Typography, styled, useTheme } from "@mui/material"
import { SyntheticEvent, useState, useEffect } from 'react';
import { useTranslation } from "react-i18next"
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useNavigate } from "react-router"
import { journeyApi } from "@services/api/journeyApi"
import { MxStepStore, MxUserStore } from "@stores"
import { StepModel } from "@models/Step/Step"
import { toJS } from "mobx"
import { JourneyModel } from "@models/Journey/Journey"
const { stepsList } = MxStepStore

const SearchContainer = styled(Box)(
  () => `
    width: 100%;
    margin-bottom: 1em;
  `
)

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

const InfoContainer = styled(Box)(
  () => `
    margin-top: 1em;
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

const ButtonsContainer = styled(Box)(
  () => `
    display: flex;
    flex-direction: row;
  `
)

const RevisionContainer = styled(Box)(
  () => `
  `
)

interface CheckData {
  journey: string
  step: string
  previousOk: boolean
  stamps?: boolean
  ctPat?: boolean
  value: string | number | null | {}
}

export const Check = () => {
  const {t} = useTranslation()
  const theme = useTheme()
  const navigate = useNavigate()
  const [selectedContainer, setSelectedContainer] = useState<ContainerModel | null>()
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [ctPat, setCtPat] = useState(false)
  const [ctPatChecked, setCtPatChecked] = useState(false)
  const [previousOk, setPreviousOk] = useState(false)
  const [stamps, setStamps] = useState(false)
  const [title, setTitle] = useState<string | null>(null)
  const [buttonVisible, setButtonVisible] = useState(false)
  const [actualStep, setActualStep] = useState<StepModel | undefined>(undefined)
  const [actualStepsList, setActualStepsList] = useState<StepModel[]>([])
  const [journey, setJourney] = useState<JourneyModel | undefined>(undefined)
  const [journeyLog, setJourneyLog] = useState<JourneyLog | undefined>()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const { user } = MxUserStore


  useEffect(() => {
    if (selectedContainer && ((ctPat && previousOk) || (stamps && previousOk))) {
      setButtonVisible(true)
    }
    else {
      setButtonVisible(false)
    }
  }, [ctPat, previousOk, stamps, selectedContainer])

  useEffect(() => {
    const sList = toJS(stepsList)
    let stpList:StepModel[] = []
    const routeName = location.pathname
    const actualStep = sList.find(item => {
      stpList = [...stpList, item.step]
      if (routeName.includes(item.step.routeName)) {
        return item.step
      }
    })
    if(sList && actualStep){
      setActualStepsList(stpList)
      setActualStep(actualStep.step)
    }    
  }, [])
  
  const handleSelected = async (selected:SearchItem) => {
    setSelectedContainer(selected as ContainerModel)
    setErrorMsg(null)
    try {
      const journeyResp = await journeyApi.getJourneyByContainerNumber(selected.containerNumber)
      const journey = journeyResp.data

      setJourney(journey)
      if(journey && actualStep) {
        const journeyLog = await journeyApi.getJourneyLog(journey, actualStep)
        setJourneyLog(journeyLog.data)
      }
    } catch (error) {
      setErrorMsg(t('Container number not found at this step'))
      setSelectedContainer(null)
    }
  }

  const deleteSelected = (type:string) => {
    switch (type) {
      case "container":
        setSelectedContainer(null)
      break;
    }
  }

  const handleType = async (type:string) => {
    setSelectedType(type) 

    switch (type) {
      case "load":
         setTitle(`${t("Load")}`)
      break;
      case "unload":
        setTitle(`${t("Unload")}`)

        if (journey && user) {
          const postData = {
            journeyId: journey.id,
            userId: user.id
          }
          try {
            const resp = await journeyApi.journeyToUnload(postData)
            resetValues()
          } catch (error) {
            console.log("TODO: Error handling ", error)
          }
        }
      break;
    }
  }

  const handleChecks = (e: SyntheticEvent<Element, Event>) => {
    const { checked, name } = e.target as HTMLInputElement

    switch (name) {
      case "ct-pat":
        setCtPat(checked)
      break;
      case "previous":
        setPreviousOk(checked)
      break;
      case "stamps":
        setStamps(checked)
      break;
    }
  }

  const handleSubmit = async () => {
    if (journey && actualStep) {
      let patchData:CheckData = {
        journey: journey.id,
        step: actualStep.id,
        value: null,
        previousOk,
      }

      switch (actualStep?.routeName) {
        case 'check-one':
          patchData = { ...patchData, value: { ctPat } }
        break;
        case 'check-two':
          patchData = { ...patchData, value: { stamps } }
        break;      
      }
      await journeyApi.updateJourney(patchData)
      resetValues()
    }
  }

  const resetValues = () => {
    setSelectedContainer(null)
    setCtPat(false)
    setPreviousOk(false)
    setStamps(false)
    setSelectedType(null)
    setTitle(null)  
  }

  return (
    <PageLayout
      seoTitle='Check dashboard'
      title='Check dashboard'
      buttonConfig={{
        visible: false, 
        title: '', 
        action: () => alert('To-do')}
    }>
    <MainContent className="main-content" sx={{ marginTop: 2 }}>
      { errorMsg && 
        <p>{errorMsg}</p>
      }
      { !selectedContainer &&
        <SearchContainer>
          <SearchForm
            sendSelected={(selected) =>handleSelected(selected)}
            searchType="containers"
            formTitle="Seach containers"
          />
        </SearchContainer>
      }

      { selectedContainer && 
        <InfoContainer>
          <Typography variant="h4">
            Container
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

      { actualStep?.routeName === "check-one" &&
        <ButtonsContainer>
          <Typography variant="h4">
            { title }
          </Typography>
          <Button onClick={() => handleType("load")}>
            <FileUploadIcon />
            {t('Load')}
          </Button>
          <Button onClick={() => handleType("unload")}>
            <FileDownloadIcon />
            {t('Unload')}
          </Button>
        </ButtonsContainer>
      }

      { selectedType === "load" && 
        <RevisionContainer>
          <Typography variant="h3">
            Revisión
          </Typography>
          { actualStep?.routeName === "check-one" ?
            <FormControlLabel 
              control={<Checkbox />} 
              label={t("CT-PAT norm OK")}
              name="ct-pat"
              onChange={e => handleChecks(e)}
            />
          :
            <FormControlLabel 
              control={<Checkbox />} 
              label={t("Stamp information OK")}
              name="stamps"
              onChange={e => handleChecks(e)}
            />
          }
          <FormControlLabel 
            control={<Checkbox />} 
            label={t("Previous information OK")} 
            name="previous"
            onChange={e => handleChecks(e)}
          />
          { buttonVisible &&  
            <Button onClick={handleSubmit}>
              {t("Continue")}
            </Button>
          }
        </RevisionContainer>
      }
    </MainContent>
    </PageLayout>
  )
}