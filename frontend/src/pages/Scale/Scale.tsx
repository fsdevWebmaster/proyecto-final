import React, { MouseEvent } from 'react';
import { SearchForm } from "@components/Search/SearchForm"
import { PageLayout } from "@layouts/Page/PageLayout"
import { Alert, Avatar, Box, Button, Card, Grid, IconButton, TextField, Typography, styled, useTheme } from "@mui/material"
import { SearchItem } from '../../components/Search/useSearch';
import { useTranslation } from "react-i18next";
import { ChangeEvent, useEffect, useState } from "react";
import { ContainerModel, JourneyLog } from "@models";
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation, useNavigate } from "react-router";
import { journeyApi } from "@services/api/journeyApi";
import { JourneyModel } from "@models/Journey/Journey";
import { StepModel } from "@models/Step/Step";
import { MxStepStore, MxUserStore } from "@stores";
import { toJS } from "mobx";
import { ScaleOutlined } from "@mui/icons-material";
import { observer } from "mobx-react";
import { CustomDialog } from '@components/Dialog/CustomDialog';
import { ButtonConfig } from '@common/interfaces';
import useWS from '@hooks/useWS';

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
  const socket = useWS();
  const { stepsList } = MxStepStore

  const [scaleType, setScaleType] = useState<string | null>()
  const [scaleTitle, setScaleTitle] = useState<string | null>()
  const [selectedContainer, setSelectedContainer] = useState<ContainerModel | null>()
  const [selectedWeight, setSelectedWeight] = useState<number | null>()
  const [weight, setWeight] = useState(0)
  const [validWeight, setValidWeight] = useState(false)
  const [journey, setJourney] = useState<JourneyModel | null>(null)
  const [actualStep, setActualStep] = useState<StepModel | undefined>(undefined)
  const [actualStepsList, setActualStepsList] = useState<StepModel[]>([])
  const [journeyLog, setJourneyLog] = useState<JourneyLog | undefined>()
  const [stepMessage, setStepMessage] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false);

  const handleSelected = async (selected:SearchItem) => {
    // get journey
    try {
      const journeyResp = await journeyApi.getJourneyByContainerNumber(selected.containerNumber)
      const journey = journeyResp.data
      setJourney(journey)
      if(journey && actualStep) {
        if (actualStep.id === journey.step.id) {
          setSelectedContainer(selected as ContainerModel)
          const journeyLog = await journeyApi.getJourneyLog(journey, actualStep)
          setJourneyLog(journeyLog.data)
        }
        else {
          setSelectedContainer(null)
          setStepMessage('There is no container with that number in this step')
          setTimeout(() => {
            setStepMessage(null)
          }, 2000);          
        }
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
    if (journey && actualStep && MxUserStore.user) {
      const journeyLog = await journeyApi.getJourneyLog(journey, actualStep)
      if(journeyLog) {
        const patchData = {
          journey: journey.id,
          step: journeyLog.data.step,
          value: selectedWeight,
          status: 'IN_PROGRESS',
          userId: MxUserStore.user.id
        }
        const updateData = await journeyApi.updateJourney(patchData)
        if (updateData.data && socket) socket?.emit('journey:send_journey', { id: updateData.data.journey});
        
        setSelectedContainer(null)
        setSelectedWeight(null)
        handleDialog();
      }
    }
  }

  const handleDialog = () => {
    setOpenDialog(!openDialog);
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
    console.log('actualStep: ',actualStep)
    if(sList && actualStep){
      setActualStepsList(stpList)
      setActualStep(actualStep.step)
    }
    const scaleType = actualStep?.step.routeName
    console.log('scaleType: ',scaleType)
    if (scaleType) {
      switch (scaleType) {
        case "scale-one":
          setScaleTitle(t("Scale one"))          
        break;
        case "scale-two":
          setScaleTitle(t("Scale two"))
        break;
      }
    }
  }, [])
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/')
  }

  return (
    <PageLayout
      seoTitle= {t(scaleTitle)}
      title= {t('scaleTitle')}
      buttonConfig={{
        visible: true, 
        title: 'Go Back to main page', 
        action: () => handleBack()}
    }>
      <MainContent className="main-content" sx={{ marginTop: 2 }}>
        { stepMessage && 
          <Alert severity="error" sx={{ marginBottom: 1 }}>
            {t(stepMessage)}
          </Alert>
        }
        { actualStep && 
          <Box sx={{ display: 'flex', marginBottom: 2 }}>
            <Avatar 
              variant="square"
              sx={{ 
                marginRight: 1,
                backgroundColor: theme.colors.primary.dark 
              }}

            >
              <ScaleOutlined />
            </Avatar>
            { actualStep.routeName.includes('one') &&
              <Typography 
                variant='h3' 
                color={theme.colors.primary.dark}
              >
                {t('Scale One')}
              </Typography>
            }
            { actualStep.routeName.includes('two') &&
              <Typography 
                variant='h3' 
                color={theme.colors.primary.dark}
              >
                {t('Scale Two')}
              </Typography>
            }
          </Box>
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
                  <IconButton edge="end" onClick={() => deleteSelected('container')}>
                    <DeleteIcon sx={{ color: theme.colors.primary.dark }} />
                  </IconButton>
              </MainRow>
            </Card>
          </InfoContainer>
        }

        { !selectedContainer && actualStep &&
          <SearchContainer>
            <SearchForm
              sendSelected={(selected) =>handleSelected(selected)}
              searchType="containers"
              formTitle={t("Search containers")}
              actualStep={actualStep}
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
      <CustomDialog
        isOpen={openDialog}
        type="success"
        header={t('Datos del contenedor actualizados')}
        configBtn={dialogButtons}
      />      
    </PageLayout>
  )
}

export default observer(Scale);
