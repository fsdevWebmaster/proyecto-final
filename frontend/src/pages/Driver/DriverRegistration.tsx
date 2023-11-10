import React, { MouseEvent, useCallback, useState } from 'react';
import {
  Box,
  Card,
  Container,
  Typography,
  styled
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { DriverRegistrationForm } from "@components/DriverRegistrationForm/DriverRegistrationForm";
import { ButtonConfig } from '@common/interfaces';
import { CustomDialog } from '@components/Dialog/CustomDialog';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
  `
)

const TopWrapper = styled(Box)(
  () =>`
    display: flex;
    with: 100%;
    flex: 1;
    padding: 20px;
  `
)

const DriverRegistration = () => {

  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialog =  useCallback(() => {
    setOpenDialog(!openDialog);
  }, []);

  const dialogButtons: ButtonConfig[] = [
    {
      action: (ev: MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        handleDialog();
      },
      title: t('Cerrar'),
    }
  ];   

  return(
    <>
      <Helmet>
        <title>{t('Driver Registry')}</title>
      </Helmet>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="sm">
            <Card
              sx={{
                px: 4,
                pt: 5,
                pb: 3
              }}
            >
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1
                  }}
                >
                  {t('Driver Registration')}
                </Typography>
              </Box>
              <DriverRegistrationForm modalAction={handleDialog} />
            </Card>
          </Container>
        </TopWrapper>
        <CustomDialog
          isOpen={openDialog}
          type="success"
          header={t('Nuevo chofer ingresado al sistema')}
          configBtn={dialogButtons}
        />
      </MainContent>
    </>
  )

}

export default DriverRegistration;
