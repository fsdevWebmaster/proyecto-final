import React, { useCallback, useEffect, useState, MouseEvent } from 'react';
import { observer } from 'mobx-react';
import { PageLayout } from '@layouts/Page/PageLayout';
import { Box, Card, Divider, Grid, IconButton, Stack, Step, StepLabel, Stepper, Tooltip, Typography } from '@mui/material';
import { ProgressBar } from '@components/ProgressBar/ProgressBar';
import { Station, Status } from 'src/types/common';
import { useTranslation } from 'react-i18next';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ColorlibConnector } from './customStyles';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { ColorlibStepIcon } from '@components';
import { useNavigate, useParams } from 'react-router-dom';
import { MxJourneyStore, MxStepStore } from '@stores';
import { StepModel } from '@models/Step/Step';
import { journeyApi } from '@services/api/journeyApi';
import { format } from 'date-fns';
import useWS from '@hooks/useWS';
import { ButtonConfig } from '@common/interfaces';
import { CustomDialog } from '@components/Dialog/CustomDialog';
import { JourneyLog } from '@models';
import { InfoStep } from './InfoStep';

const JourneyLog = () => {
  const { t } = useTranslation();
  const { containerNumber } = useParams();
  const socket = useWS();
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate()
  const { stepsList } = MxStepStore;
  const { journey, driver, logs } = MxJourneyStore;
  const date = journey ? new Date(journey.createdAt) : new Date();

  const castSteps = useCallback(() => {
    const steps = stepsList.map((step: Station) => {
      return step.step;
    });

    return steps;
  }, [stepsList]);

  const [percentage, setPercentage] = useState(0);
  
  const steps = castSteps();
  const matchStepIndex = steps.findIndex(step => step.id === journey?.step.id);
  const stepIndex = matchStepIndex < 0 ? 0 : matchStepIndex;
  const currentStep = steps[matchStepIndex];
  const progress = {
    level: 'In Progress',
    type: 'success' as Status,
  }

  const calculatePercentage = useCallback(() => {
    const totalSteps = stepsList.length > 0 ? stepsList.length : 0;
    const logsIndex = logs.length === 2 ? 0 : -1;
  
    let total = 0;
    if (totalSteps) {
      total = stepIndex * 100 / totalSteps;
    }

    setPercentage(Math.round(total));
  }, [stepsList]);


  const dialogButtons: ButtonConfig[] = [
    {
      action: (ev: MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        handleDialog();
        navigate('/')
      },
      title: t('Cerrar'),
    }
  ];

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  }  

  const validateContainer = useCallback(async (container: string | undefined) => {
    if(container) {
      try {
        const journeyData = await journeyApi.getJourneyByContainerNumber(container);
        if (journeyData.data) {
          MxJourneyStore.setJourney(journeyData.data);
          const driver = await journeyApi.getDriverOnJourney(journeyData.data.driver);
          MxJourneyStore.setDriver(driver.data);

          const journeyLogs = await journeyApi.getLogs(journeyData.data.id);
          if(journeyLogs.data) {
            const castLogs = journeyLogs.data;
            MxJourneyStore.setJourneyLogs(castLogs);
          }
        }
      } catch (error: any) {
        if(error.response.status === 404) {
          handleDialog()
        }
      }
    }
  }, []);

  const handleBack = () => {
    navigate('/admin-journeys-dashboard')
  }

  useEffect(() => {
    validateContainer(containerNumber);
  }, []);


  // WebSocket
  useEffect(() => {
    if (socket) {
      socket.on('journey:updated_journey', (data) => {
        if (data.journeyUpdate) {
          validateContainer(containerNumber);
        }
      });
    }
  }, [socket]);

  useEffect(() => {    
    calculatePercentage();
  }, [calculatePercentage]);  

  return (
    <PageLayout seoTitle='Journey Log' title={`Container: # ${containerNumber}`} buttonConfig={{visible: false}}
      backButtonConfig={{
        visible : true,
        title: t('Go Back to journeys dashboard'),
        action: () => handleBack()
      }}>
      <Grid item container direction="row" spacing={4}>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Stack spacing={4} width={1} overflow="auto">
              <Stepper alternativeLabel activeStep={stepIndex} connector={<ColorlibConnector />} sx={{ background: 'none'}}>
                {steps.map((step: StepModel) => (
                  <Step key={step.id}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>{step.name}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Stack>
        </Grid>
        <Grid item xs={12} display="flex">
          <Card sx={{ padding: 3, width: 1}}>
            <Typography variant='h3' gutterBottom>{t('Informacion de Recorrido')}</Typography>
            {currentStep && <ProgressBar type={progress.type} percentage={percentage} status={progress.level} currentLocation={currentStep.name || ''}/>}
            <Grid item container direction="row" mt={6}>

              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>{t('Fecha de ingreso')}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6'>{format(date, 'dd MMMM yyyy')}</Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>{t('Hora')}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6'>{format(date, 'HH:mm a')}</Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>{t('Contenedor')}:</Typography>
              </Grid>
              <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-start">
                <Typography variant='h6' display="flex" align="center">{`# ${containerNumber}`}</Typography>
                  <LocalShippingIcon sx={{ ml: '10px'}} />
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>{t('Chofer')}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-start">
                  <Typography variant='h6'>{driver?.name}</Typography>
                  <AccountCircleIcon sx={{ ml: '10px'}} />
                </Box>
              </Grid>

            </Grid>
            <Grid item container direction="row" mt={6}>
              <Grid item>
                <Divider sx={{ width: 1, backgroundColor: 'primary', height: '2px'}}/>
              </Grid>
              {logs.map((log: JourneyLog, index: number) => {
                const currentStep = stepsList.find(step => step.step.id === log.step.id);
                return currentStep && (
                  <Grid item container key={`item-${currentStep?.step.routeName}`} alignItems="center">
                    <Grid item xs={4}>
                      <Typography variant='h6' fontWeight="bold" gutterBottom>{currentStep?.step.name}</Typography>
                    </Grid>
                    <Grid item xs={6} display="flex" alignItems="center">
                      <InfoStep data={log.stepValue} step={currentStep} />
                      {log.description && (
                        <Tooltip title={log.description}>
                        <IconButton aria-label='info'>
                          <InfoOutlinedIcon/>
                        </IconButton>
                      </Tooltip>                        
                      )}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <CustomDialog
        isOpen={openDialog}
        type="warning"
        header={t('El contenedor no ha sido encontrado.')}
        configBtn={dialogButtons}
      />      
    </PageLayout>
  );
}

export default observer(JourneyLog);
