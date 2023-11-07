import React from 'react';
import { StepIconProps } from '@mui/material';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import MinorCrashIcon from '@mui/icons-material/MinorCrash';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ScaleIcon from '@mui/icons-material/Scale';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import { ColorlibStepIconRoot } from '@pages/JourneyLog/customStyles';

export const ColorlibStepIcon = (props: StepIconProps) => {
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