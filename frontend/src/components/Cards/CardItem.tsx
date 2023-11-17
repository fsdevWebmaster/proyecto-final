import {
  Link,
  CardContent,
  Avatar,
  Box,
  Typography,
  ListItemAvatar,
  Card,
  ListItemText,
  ListItem,
  styled
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import BusinessTwoToneIcon from '@mui/icons-material/BusinessTwoTone';
import LocalConvenienceStoreTwoToneIcon from '@mui/icons-material/LocalConvenienceStoreTwoTone';
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import SportsBasketballTwoToneIcon from '@mui/icons-material/SportsBasketballTwoTone';

import { observer } from 'mobx-react';

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.main};
      color: ${theme.palette.getContrastText(theme.colors.error.main)};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.error};
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.primary.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.primary.main};
      color: ${theme.palette.getContrastText(theme.colors.primary.main)};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.primary};
`
);

const AvatarWarning = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.warning.main};
      color:  ${theme.palette.primary.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.warning};
`
);

const CardContentWrapper = styled(CardContent)(
  ({ theme }) => `
     padding: ${theme.spacing(2.5, 3, 3)};
  
     &:last-child {
     padding-bottom: 0;
     }
`
);

interface ICardItemProps {
  title: string;
  topData: string;
  iconType: 'error' | 'success' | 'primary' | 'warning';
}

const CardItem = ({title, iconType, topData}: ICardItemProps) => {
  const { t }: { t: any } = useTranslation();

  const renderIconType = () => {
    switch(iconType) {
      case 'error':
        return (
          <AvatarError variant="rounded">
            <BusinessTwoToneIcon fontSize="large" />
          </AvatarError>          
        );

        case 'warning':
          return (
            <AvatarWarning variant="rounded">
              <LocalConvenienceStoreTwoToneIcon fontSize="large" />
            </AvatarWarning>            
          );

        case 'primary':
            return (
              <AvatarPrimary variant="rounded">
                <SportsBasketballTwoToneIcon fontSize="large" />
              </AvatarPrimary>              
            );

      default:
          return (
            <AvatarSuccess variant="rounded">
              <AssessmentTwoToneIcon fontSize="large" />
            </AvatarSuccess>            
          );
    }
  }

  return (
    <Card>
      <CardContentWrapper>
        <Typography variant="overline" color="text.primary">
          {title}
        </Typography>

        <ListItem
          disableGutters
          sx={{
            my: 1
          }}
          component="div"
        >
          <ListItemAvatar>
            {renderIconType()}
          </ListItemAvatar>

          <ListItemText
            primary={topData}
            primaryTypographyProps={{
              variant: 'h1',
              sx: {
                ml: 2
              },
              noWrap: true
            }}
          />
        </ListItem>
      </CardContentWrapper>
    </Card>
  );
}

export default observer(CardItem);
