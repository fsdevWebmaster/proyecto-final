import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  styled
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

import { useTranslation } from 'react-i18next';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);

function Status404() {
  const { t }: { t: any } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('Status - 404')}</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <img alt="404" height={180} src="/static/images/status/404.svg" />
            <Typography
              variant="h2"
              sx={{
                my: 2
              }}
            >
              {t("The page you were looking for doesn't exist.")}
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
              sx={{
                mb: 4
              }}
            >
              {t(
                "It's on us, we moved the content to a different page. The search below should help!"
              )}
            </Typography>
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
