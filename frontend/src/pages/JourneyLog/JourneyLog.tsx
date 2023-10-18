import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { PageLayout } from '@layouts/Page/PageLayout';
import { Box, Card, Divider, Grid, IconButton, Stack, Step,  StepIconProps, StepLabel, Stepper, Tooltip, Typography } from '@mui/material';
import { ProgressBar } from '@components/ProgressBar/ProgressBar';
import { Status } from 'src/types/common';
import { useTranslation } from 'react-i18next';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ColorlibConnector, ColorlibStepIconRoot } from './customStyles';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import MinorCrashIcon from '@mui/icons-material/MinorCrash';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ScaleIcon from '@mui/icons-material/Scale';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ColorlibStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;  

  const icons: { [index: string]: React.ReactElement } = {
    1 : <HouseSidingIcon />,
    2 : <CarRepairIcon />,
    3 : <MinorCrashIcon />,
    4:  <NoCrashIcon />,
    5 : <ContentPasteSearchIcon />,
    6 : <ScaleIcon />,
    7 : <LocalShippingIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
};

const JourneyLog = () => {
  const { t } = useTranslation();
  const [percentage, setPercentage] = useState(1);
  const container = '409505';
  const steps = ['Yard', 'Romana 1', 'Chequeo 1', 'Chequeo 2', 'CT-PAT', 'Romana 2', 'Salida'];
  const totalSteps = steps.length;
  const currentStepPosition = 1;
  const currentStep = steps[currentStepPosition];
  const progress = {
    level: 'In Progress',
    type: 'success' as Status,
  }

  const showInfoHandler = () => {

  }


  useEffect(() => {
    setPercentage(currentStepPosition * 100 / totalSteps);
  }, []);


  return (
    <PageLayout seoTitle='Journey Log' title={`Container: # ${container}`} buttonConfig={{visible: false}}>
      <Grid item container direction="row" spacing={4}>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Stack spacing={4} width={1} overflow="auto">
              <Stepper alternativeLabel activeStep={currentStepPosition} connector={<ColorlibConnector />} sx={{ background: 'none'}}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Stack>
        </Grid>
        <Grid item xs={12} display="flex">
          <Card sx={{ padding: 3, width: 1}}>
            <Typography variant='h3' gutterBottom>{t('Informacion de Recorrido')}</Typography>
            <ProgressBar type={progress.type} percentage={percentage} status={progress.level} currentLocation={currentStep}/>
            <Grid item container direction="row" mt={6}>

              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>Fecha:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6'>15/05/2023</Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>Hora:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6'>10:20 AM</Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>Container:</Typography>
              </Grid>
              <Grid item xs={6}>
              <Box display="flex" justifyContent="flex-start">
                <Typography variant='h6' display="flex" align="center">{`# ${container}`}</Typography>
                  <LocalShippingIcon sx={{ ml: '10px'}} />
                </Box>
              </Grid>

              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>Chofer:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" justifyContent="flex-start">
                  <Typography variant='h6'>Jose M. Zuniga</Typography>
                  <AccountCircleIcon sx={{ ml: '10px'}} />
                </Box>
              </Grid>

            </Grid>
            <Grid item container direction="row" mt={6}>
              <Grid item>
                <Divider sx={{ width: 1, backgroundColor: 'primary', height: '2px'}}/>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>Romana 1</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6'>4.500 Kg</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>Chequeo 1</Typography>
              </Grid>
              <Grid item xs={6}>
                <DoneOutlineIcon color='success' />
              </Grid>
              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>Carga / Descarga</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" flexDirection="row" alignItems="center" sx={{
                  'button': {
                    marginLeft: '5px',
                    padding: '5px',
                  },
                  'svg': {
                    fontSize: '15px',
                  }
                }}>
                  <Typography variant='h6'>Carga</Typography>
                  <Tooltip title="Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. Praesent non nunc mollis, fermentum neque at, semper arcu. Nullam eget est sed sem iaculis gravida eget vitae justo">
                    <IconButton aria-label='info'>
                      <InfoOutlinedIcon/>
                    </IconButton>
                  </Tooltip>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>CT-PAT</Typography>
              </Grid>
              <Grid item xs={6}>
                <DoneOutlineIcon color='success' />
              </Grid>
              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>Chequeo 2</Typography>
              </Grid>
              <Grid item xs={6}>
                <DoneOutlineIcon color='success' />
              </Grid>
              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>DUA</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" flexDirection="row">
                  <DoDisturbOnIcon color='error' />
                  <Typography variant='h6' ml={1}>En espera</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>Romana 2</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant='h6'>5.500 Kg</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant='h6' fontWeight="bold" gutterBottom>Salida</Typography>
              </Grid>
              <Grid item xs={6}>
                <DoneOutlineIcon color='success' />
              </Grid>              
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default observer(JourneyLog);
