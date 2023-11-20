import React, { MouseEvent, useCallback, useRef, useState } from 'react';
import {
  Box,
  Card,
  Container,
  Typography,
  styled
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { DriverRegistrationForm, DriverRegistrationFormRef } from "@components/DriverRegistrationForm/DriverRegistrationForm";
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
  
  const { t } = useTranslation();
  //const [openDialog, setOpenDialog] = useState(false);

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
      title: t('Close'),
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
              <DriverRegistrationForm ref={formRef}  modalAction={handleDialog} />
            </Card>
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

export default DriverRegistration;
