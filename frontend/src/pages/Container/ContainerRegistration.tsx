import React, { MouseEvent, useCallback } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Typography,
  styled
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { ContainerRegistryForm } from "@components/ContainerRegistrationForm/ContainerRegistrationForm";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useState } from "react";
import { CustomDialog } from "@components/Dialog/CustomDialog";
import { ButtonConfig } from "@common/interfaces";

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
    width: 100%;
    flex: 1;
    padding: 20px;
  `
)

const ContainerRegistry = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState(false);

  const handleBack = () => {
    navigate('/containers')
  }

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
        <title>{t('Container Registry')}</title>
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
                  {t('Container Registry')}
                </Typography>
              </Box>
              <ContainerRegistryForm modalAction={handleDialog} />
            </Card>
            <Button
              variant='contained'
              startIcon={<ArrowBack />}
              sx={{ marginTop: '15px' }}
              onClick={handleBack}
            >
              {t('back')}
            </Button>
          </Container>
        </TopWrapper>
        <CustomDialog
          isOpen={openDialog}
          type="success"
          header={t('Se ha creado un nuevo contenedor')}
          configBtn={dialogButtons}
        />        
      </MainContent>
    </>
  )
}

export default ContainerRegistry;
