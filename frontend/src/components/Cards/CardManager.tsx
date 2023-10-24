import React, { MouseEvent } from 'react';
import { Card, Box, Typography, Divider, styled, Button, useTheme } from '@mui/material';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';


const ButtonWrapper = styled(Button)(
  ({ theme }) => `
    padding: ${theme.spacing(2, 3)};
    display: flex;
    justify-content: space-between;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    &:hover {
        background: ${theme.colors.alpha.black[5]};
        color: ${theme.colors.alpha.black[100]};
    }
  `
);

interface ICardManagerProps {
  imgPath: string;
  title: string;
  subtitle: string;
  actionHeader: string;
  clickHandler: (ev: MouseEvent<HTMLButtonElement>) => void;
}

export const CardManager = ({imgPath, title, subtitle, actionHeader, clickHandler}: ICardManagerProps) => {
  const theme = useTheme();

  return (
    <Card>
      <Box display="flex" alignItems="center" p={2}>
        <img
          style={{ height: 130 }}
          src={imgPath || ''}
          alt="..."
        />
        <Box pl={1}>
          <Typography
            sx={{
              pb: 1,
              fontSize: `${theme.typography.pxToRem(16)}`
            }}
            variant="h4"
          >
            {title}
          </Typography>
          <Typography variant="subtitle2">
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <ButtonWrapper fullWidth endIcon={<ChevronRightTwoToneIcon />} onClick={clickHandler}>
        {actionHeader}
      </ButtonWrapper>
    </Card>    
  );
}