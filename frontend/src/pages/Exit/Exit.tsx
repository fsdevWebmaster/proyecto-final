import React, { MouseEvent } from 'react';
import { SearchForm } from "@components/Search/SearchForm"
import { PageLayout } from "@layouts/Page/PageLayout"
import { ContainerModel } from "@models"
import { Alert, Box, Button, Card, IconButton, Typography, styled, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { SearchItem } from "@components/Search/useSearch"
import { useTranslation } from "react-i18next"
import { JourneyModel } from "@models/Journey/Journey"
import { MxStepStore } from "@stores"
import { StepModel } from "@models/Step/Step"
import { toJS } from "mobx"
import { observer } from "mobx-react"
import { journeyApi } from "@services/api/journeyApi"
import { CustomDialog } from '@components/Dialog/CustomDialog';
import { ButtonConfig } from '@common/interfaces';

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

export const Exit = () => {
  const theme = useTheme()
  const {t} = useTranslation()
  const { stepsList } = MxStepStore
  
  const [selectedContainer, setSelectedContainer] = useState<ContainerModel | null>()
  const [actualStep, setActualStep] = useState<StepModel | undefined>(undefined)
  const [actualStepsList, setActualStepsList] = useState<StepModel[]>([])
  const [journey, setJourney] = useState<JourneyModel | null>(null)
  const [stepMsg, setStepMsg] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false);


  const handleSelected = async (selected:SearchItem) => {
    setSelectedContainer(selected as ContainerModel)
    try {
      const resp = await journeyApi.getJourneyByContainerNumber(selected.containerNumber)
      setJourney(resp.data)
    } catch (error) {
      setStepMsg('Error: no journey found.')
      setSelectedContainer(null)
      setTimeout(() => {
        setStepMsg(null)
      }, 2000)
    }
  }

  const deleteSelected = () => {
    setSelectedContainer(null)
  }

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  }  

  const handleFinished = async () => { 
    if (journey && actualStep) {
      const respLog  = await journeyApi.getJourneyLog(journey, actualStep)
      const journeyLog = respLog.data
      const patchData = {
        journeyId: journey.id,
        step: actualStep.id,
        journeyLogId: journeyLog.id
      }
      const respFinish = await journeyApi.finishJourney(patchData)
      if (respFinish) {
        setStepMsg("Journey finished ok.")
        setSelectedContainer(null)
        setTimeout(() => {
          setStepMsg(null)
        }, 2000)
      }
      else {
        setStepMsg("Server error.")
        setSelectedContainer(null)
        setTimeout(() => {
          setStepMsg(null)
        }, 2000)
      }
      handleDialog();
    }
    else {
      setStepMsg("Error: No journey or actual step found.")
      setSelectedContainer(null)
      setTimeout(() => {
        setStepMsg(null)
      }, 2000)
    }
  }

  const dialogButtons: ButtonConfig[] = [
    {
      action: (ev: MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        handleDialog();
      },
      title: t('Cerrar'),
    }
  ];

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
        { stepMsg && 
          <>
            { stepMsg.includes("Error") ? 
                <Alert severity="error">{ stepMsg }</Alert>
              :
                <Alert>{ stepMsg }</Alert>
            } 
          </>
        }
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
            {t('Finish journey')}
          </Button>
        }
      </MainContent>
      <CustomDialog
        isOpen={openDialog}
        type="success"
        header={t('Proceso terminado con éxito. Puede salir!')}
        configBtn={dialogButtons}
      />      
    </PageLayout>
  )
}

export default observer(Exit)
