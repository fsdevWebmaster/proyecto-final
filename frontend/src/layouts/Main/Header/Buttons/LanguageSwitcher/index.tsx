import { useRef, useState } from 'react';

import {
  IconButton,
  Box,
  List,
  ListItem,
  Typography,
  ListItemText,
  alpha,
  Popover,
  Tooltip,
  styled,
  useTheme
} from '@mui/material';

import internationalization from '../../../../../i18n/i18n';
import { useTranslation } from 'react-i18next';

import { US } from 'country-flag-icons/react/3x2';
import { ES } from 'country-flag-icons/react/3x2';

const SectionHeading = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
        padding: ${theme.spacing(2, 2, 0)};
`
);

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  border-radius: ${theme.general.borderRadiusLg};
`
);

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { t }: { t: any } = useTranslation();
  const getLanguage = i18n.language;
  const theme = useTheme();

  const switchLanguage = ({ lng }: { lng: any }) => {
    internationalization.changeLanguage(lng);
  };
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title={t('Language Switcher')}>
        <IconButtonWrapper
          color="secondary"
          ref={ref}
          onClick={handleOpen}
          sx={{
            mx: 0.5,
            background: alpha(theme.colors.error.main, 0.1),
            transition: `${theme.transitions.create(['background'])}`,
            color: theme.colors.error.main,

            '&:hover': {
              background: alpha(theme.colors.error.main, 0.2)
            }
          }}
        >
          {getLanguage === 'en' && <US title="English" />}
          {getLanguage === 'es' && <ES title="Spanish" />}
        </IconButtonWrapper>
      </Tooltip>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box
          sx={{
            maxWidth: 240
          }}
        >
          <SectionHeading variant="body2" color="text.primary">
            {t('Language Switcher')}
          </SectionHeading>
          <List
            sx={{
              p: 2,
              svg: {
                width: 26,
                mr: 1
              }
            }}
            component="nav"
          >
            <ListItem
              className={
                getLanguage === 'en' || getLanguage === 'en-US' ? 'active' : ''
              }
              button
              onClick={() => {
                switchLanguage({ lng: 'en' });
                handleClose();
              }}
            >
              <US title="English" />
              <ListItemText
                sx={{
                  pl: 1
                }}
                primary="English"
              />
            </ListItem>
            <ListItem
              className={getLanguage === 'es' ? 'active' : ''}
              button
              onClick={() => {
                switchLanguage({ lng: 'es' });
                handleClose();
              }}
            >
              <ES title="Spanish" />
              <ListItemText
                sx={{
                  pl: 1
                }}
                primary="Spanish"
              />
            </ListItem>
          </List>
        </Box>
      </Popover>
    </>
  );
}

