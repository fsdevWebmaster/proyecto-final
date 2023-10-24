import { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  styled
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import RefreshTwoToneIcon from '@mui/icons-material/RefreshTwoTone';
import LoadingButton from '@mui/lab/LoadingButton';

import { useTranslation } from 'react-i18next';

const GridWrapper = styled(Grid)(
  ({ theme }) => `
    background: ${theme.colors.gradients.black1};
`
);

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

const TypographyPrimary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.trueWhite[100]};
`
);

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.trueWhite[70]};
`
);

const Status500 = () => {
  const { t }: { t: any } = useTranslation();

  const [pending, setPending] = useState(false);

  const handleClick = () => {
    setPending(true);
    window.localStorage.removeItem('accTkn');
    return window.location.href = "/login";
  };

  return (
    <>
      <Helmet>
        <title>{t('Status - 500')}</title>
      </Helmet>
      <MainContent>
        <Grid
          container
          sx={{
            height: '100%'
          }}
          alignItems="stretch"
          spacing={0}
        >
          <GridWrapper
            sx={{
              display: { xs: 'none', md: 'flex' }
            }}
            xs={12}
            alignItems="center"
            display="flex"
            justifyContent="center"
            item
          >
            <Container maxWidth="sm">
              <Box textAlign="center">
                <TypographyPrimary
                  variant="h1"
                  sx={{
                    my: 2
                  }}
                >
                  {t('< Uncontrolled error has affected the app >')}
                </TypographyPrimary>
                <TypographySecondary
                  variant="h4"
                  fontWeight="normal"
                  sx={{
                    mb: 4
                  }}
                >
                  {t(' Please back to Login Page')}
                </TypographySecondary>
                <LoadingButton
                  onClick={handleClick}
                  loading={pending}
                  size="large"
                  variant="contained"
                  startIcon={<RefreshTwoToneIcon />}
                >
                  {t('Login')}
                </LoadingButton>                
              </Box>
            </Container>
          </GridWrapper>
        </Grid>
      </MainContent>
    </>
  );
}

export default Status500;
