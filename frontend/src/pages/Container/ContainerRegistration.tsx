import React, { MouseEvent, useCallback, useRef } from 'react';
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
import { DriverRegistrationFormRef } from '@components/DriverRegistrationForm/DriverRegistrationForm';

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
  const formRef = useRef<DriverRegistrationFormRef>(null);


  type ModalState = {
    open: boolean;
    type: "error" | "success" | "info" | "warning";
    message: string;
  };

  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    type: 'success',
    message: ''
  });
  
  const navigate = useNavigate()
  const { t } = useTranslation();

  const handleBack = () => {
    navigate('/containers')
  }

  const handleDialog = useCallback((type: "error" | "success" | "info" | "warning", message = '') => {
    setModalState(prevState => ({
      ...prevState,
      open: !prevState.open,
      type,
      message
    }));
  }, []);

  const handleClose = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    if (formRef.current) {
      formRef.current.resetForm();
    }
    setModalState(prevState => ({
      ...prevState,
      open: false
    }));
  };

  const dialogButtons: ButtonConfig[] = [
    {
      action: handleClose,
      title: t('Close')
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
          isOpen={modalState.open}
          type={modalState.type}
          header={modalState.message}
          configBtn={dialogButtons}
        />        
      </MainContent>
    </>
  )
}

export default ContainerRegistry;
