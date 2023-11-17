import {  Box, Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PageLayout } from "@layouts/Page/PageLayout";
import { StepModel } from "@models/Step/Step";
import { useEffect } from "react";
import { MxDriverStore, MxStepStore } from "@stores";
import { JWTHelper } from "@helpers/jwtHelper";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { ProgressBar } from "@components/ProgressBar/ProgressBar";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import NoLuggageIcon from '@mui/icons-material/NoLuggage';
import LogoutIcon from '@mui/icons-material/Logout';
import { Status } from "src/types/common";
import { useDate } from "@hooks/useDate";
import { JourneyHelper } from "@helpers/journeyHelper";
import { ColorlibStepIcon } from '@components';
import { Step } from "./Step";
import useWS from "@hooks/useWS";


const DriverDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const socket = useWS();

  const theme = useTheme();
  const {date, time} = useDate();

  const progress = {
    level: t('Progreso'),
    type: 'success' as Status,
  }

  const { currentJourneyId, driver, journeyLogs } = MxDriverStore;
  const { stepsList } = MxStepStore;

  const logsIndex = journeyLogs.length === 2 ? 0 : -1;
  const currentJourneyLog = journeyLogs?.at(logsIndex);
  const stepsInfo = JourneyHelper.findStepInfoById(currentJourneyLog?.step.id!, stepsList as []);
  const totalSteps = stepsList.length > 0 ? stepsList.length : 100;
  const currentStepPosition = stepsInfo[0]?.order ? (stepsInfo[0]?.order - 1) : 1;

  const percentage = currentStepPosition * 100 / totalSteps;

  const redirectPage = () => navigate('/login', { replace: true });

  const showJourneyLogs = async (journeyId: string | null) => {
    await MxDriverStore.setCurrentStationInLogByJourneyId(journeyId);
  };

  const initPanel = async(driverId?: string) => {
    const journeyId = await MxDriverStore.getJourneyByDriverId(driverId || '');
    MxDriverStore.setCurrentJourneyId(journeyId);
    const steps = await MxStepStore.handleStepsForDriver();
    MxStepStore.setStepsList(steps?.data);
  }

  useEffect( () => {
    const loadJourney = async () => {
      const token = MxDriverStore.getAccessToken();
      if (token) {
        const decodedData = JWTHelper.decodeToken(token);
        if (decodedData) {
          const { driver } = decodedData;
          MxDriverStore.setSession(token);
          MxDriverStore.setDriver(driver);
          await initPanel(driver.idDoc);
        }else {
          redirectPage();
        }
      } else {
        redirectPage();
      }
    };

    loadJourney();
  }, []);

  useEffect(() => {
    showJourneyLogs(currentJourneyId);
  }, [currentJourneyId]);

  const logOut = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    MxDriverStore.logOut();
    redirectPage();
  }

  // WebSocket
  useEffect(() => {
    if (socket) {
      socket.on('journey:updated_journey', async (data) => {
        if (data.journeyUpdate) {
          const journeyId = await MxDriverStore.getJourneyByDriverId(driver?.idDoc || '');
          if (journeyId) {
            MxDriverStore.setCurrentJourneyId(journeyId);
            showJourneyLogs(journeyId);
          }
        }
      });
    }
  }, [socket]);

  return (
    <PageLayout
      seoTitle={t('Drivers dashboard')}
      title={t(`Welcome {{driver}}`, { driver: driver?.name})}
      icon={<LocalShippingIcon />}
      buttonConfig={{
        visible: true,
        action: logOut,
        title: t('Logout'),
        icon: (<LogoutIcon fontSize="small" />)
      }}
    >
      <Grid container sx={{ paddingLeft: 4, mt: 3}}>
        <Grid item xs={12} lg={10}>
          <ProgressBar type="secondary" percentage={percentage} status={progress.level} currentLocation={t('Terminado')} header={ currentJourneyId ? `${t('Contenedor')} : ${currentJourneyLog?.journey.containerNumber}` : ''} />
        </Grid>
        <Grid item xs={12} lg={2} flexDirection="row" justifyContent="flex-end" display="flex" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Box display="flex" alignItems="center">
              <Typography fontSize="medium" fontWeight="bold" mr={1}>{t('Fecha')}:</Typography>
              <Typography>{date}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography fontSize="medium" fontWeight="bold" mr={1}>{t('Hora')}:</Typography>
              <Typography>{time}</Typography>
            </Box>         
          </Box>
          <QueryBuilderIcon sx={{ ml: 1}}/>
        </Grid>
        <Grid item xs={12}>
          <Box
            width={1}
            height="auto"
            display="flex"
            alignItems="center"
            flexDirection="row"
            justifyContent="center"
            position="relative"
            sx={{
              padding: '70px 0',
            }}
          >
            {currentJourneyId ? (
              <Box display="flex" justifyContent="center" alignItems="center" width={1} flexDirection="column">
                <Typography fontSize="medium" variant="h3">{t('Estación Actual')}:</Typography>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-around"
                  alignItems="center"
                  width="inherit"
                  mt={5}
                  sx={{
                    '& .arrow': {
                      transform: 'rotate(270deg)',
                      'span': {
                        display: 'block',
                        width: '1.5vw',
                        height: '1.5vw',
                        borderBottom: `5px solid ${theme.colors.success.light}`,
                        borderRight: `5px solid ${theme.colors.success.light}`,
                        transform: 'rotate(45deg)',
                        animation: 'animate 2s infinite',
                        '&:nth-of-type(2)': {
                          animationDelay: '-0.2s',
                        },
                        '&:nth-of-type(3)': {
                          animationDelay: '-0.4s',
                        }
                      }
                    },
                    '@keyframes animate': {
                      '0%': {
                          opacity: 0,
                          transform: 'rotate(45deg) translate(-20px, -20px)',
                      },
                      '50%': {
                          opacity: 1,
                      },
                      '100%': {
                          opacity: 0,
                          transform: 'rotate(45deg) translate(20px, 20px)',
                      },
                    }
                  }}
                >
                  {stepsInfo.map((step: StepModel, index: number) => (
                    <Box
                      key={step.name}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-evenly"
                      flexDirection="row"
                      width="inherit"
                    >
                      <Step
                        journeyId={currentJourneyId}
                        readonly={index > 0}
                        sx={{
                          width: { xs: 140, lg: 180},
                          height: { xs: 140, lg: 180}
                        }}
                      >
                        <ColorlibStepIcon icon={step.order} />
                        <Typography fontSize="medium" fontWeight="bold" mt={1} color={index > 0 ? theme.colors.secondary.lighter : theme.colors.success.light}>{`${step.name}`}</Typography>
                      </Step>
                      <Box className="arrow" display={index === 0 && step.routeName !== 'exit' ? 'block' : 'none'}>
                        <span></span>
                        <span></span>
                        <span></span>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : (
              <Step sx={{ width: { xs: 180, lg: 200}, height: { xs: 180, lg: 200}}} journeyId={null}>
                <NoLuggageIcon fontSize="medium"/>
                <Typography fontSize="medium">{t('No tiene viajes activos')}</Typography>                
              </Step>
            )}
          </Box>
        </Grid>
      </Grid>
    </PageLayout>
  )
}

export default observer(DriverDashboard);