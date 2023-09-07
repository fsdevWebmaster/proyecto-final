import React from 'react';
import { LinearProgress, styled, linearProgressClasses, alpha } from "@mui/material";

const LinearProgressSuccess = styled(LinearProgress)(
  ({ theme }) => `
      height: 6px;
      border-radius: ${theme.general.borderRadiusLg};

      &.${linearProgressClasses.colorPrimary} {
        background: ${alpha(theme.colors.alpha.black[100], 0.1)};
      }
      
      & .${linearProgressClasses.bar} {
        border-radius: ${theme.general.borderRadiusLg};
        background: ${theme.colors.gradients.green1};
      }
    `
);
const LinearProgressError = styled(LinearProgress)(
  ({ theme }) => `
      height: 6px;
      border-radius: ${theme.general.borderRadiusLg};

      &.${linearProgressClasses.colorPrimary} {
        background: ${alpha(theme.colors.alpha.black[100], 0.1)};
      }
      
      & .${linearProgressClasses.bar} {
        border-radius: ${theme.general.borderRadiusLg};
        background: ${theme.colors.gradients.purple3};
      }
    `
);

const LinearProgressWarning = styled(LinearProgress)(
  ({ theme }) => `
      height: 6px;
      border-radius: ${theme.general.borderRadiusLg};

      &.${linearProgressClasses.colorPrimary} {
        background: ${alpha(theme.colors.alpha.black[100], 0.1)};
      }
      
      & .${linearProgressClasses.bar} {
        border-radius: ${theme.general.borderRadiusLg};
        background: ${theme.colors.gradients.orange1};
      }
    `
);

export const ProgressFactory = (type: string) => {
  switch (type) {
    case 'warning':
      return LinearProgressWarning

    case 'error':
        return LinearProgressError

    default:
        return LinearProgressSuccess
  }
}