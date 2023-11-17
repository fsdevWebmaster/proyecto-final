import React from 'react';
import { Box, Typography } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Station } from 'src/types/common';
import { useTranslation } from 'react-i18next';

interface IInfoStepProsp {
  step: Station;
  data: any;
}

export const InfoStep = ({ step, data }: IInfoStepProsp): React.ReactNode => {
  const stepDetail = step.step;
  const { t } = useTranslation();

  switch(stepDetail.routeName) {
    case 'yard':
        return <Typography variant='h6' ml={1}>{t('En espera!')}</Typography>;
    case 'scale-one':
    case 'scale-two':
        return <Typography variant='h6' ml={1}>{`${data} Kg`}</Typography>;
    case 'check-one':
    case 'check-two':
      const { stamps, ctPat } = data;
      if (stamps || ctPat) {
        return (
          <Box display="flex" flexDirection="row">
            <DoneOutlineIcon color='success' />
          <Typography variant='h6' ml={1}>{t('Aprobado!')}</Typography>
        </Box>          
        );
      } else {
        return <Box display="flex" flexDirection="row">
          <DoDisturbOnIcon color='error' />
          <Typography variant='h6' ml={1}>{t('En espera!')}</Typography>
        </Box>               
      }
    default:
      return <Typography variant='h6' ml={1}>{data}</Typography>;
  }
}