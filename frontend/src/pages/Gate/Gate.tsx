import React, { MouseEvent } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from "react-i18next";
import { SearchForm } from "@components/Search/SearchForm";
import { useEffect, useState } from "react";
import { SearchItem } from "@components/Search/useSearch";
import { PageLayout } from "@layouts/Page/PageLayout";
import { journeyApi } from "@services/api/journeyApi";
import { MxStepStore, MxUserStore } from "@stores";
import { observer } from 'mobx-react';
import { useLocation } from "react-router";
import { StepModel } from "@models/Step/Step";
import { LocalShipping } from "@mui/icons-material";
import useWS from "@hooks/useWS";
import { PageHelper } from "@helpers/pageHelper";
import { CustomDialog } from "@components/Dialog/CustomDialog";
import { ButtonConfig } from '@common/interfaces';
import { useNavigate } from 'react-router';


const MainContent = styled(Box)(
  () =>`
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
  `
)

const TopWrapper = styled(Box)(
  () =>`
    dispaly: flex;
    width: 100%;
    flex: 1;
    padding: 20px;
  `
)

const SelectedCard = styled(Box)(
  () => `
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    padding: 0.5em 1.5em;
    margin: 1em 0;
  `
)


const Gate = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const theme = useTheme();
  const { stepsList } = MxStepStore
  const socket = useWS();

  const [container, setContainer] = useState<SearchItem | null>()
  const [driver, setDriver] = useState<SearchItem | null>()
  const [formMessage, setFormMessage] = useState<string | undefined>(undefined)
  const [actualStep, setActualStep] = useState<StepModel | undefined>(undefined)
  const [openDialog, setOpenDialog] = useState(false);

  const handleContainer = (item:SearchItem) => {
    setContainer(item)
  }

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  }

  const dialogButtons: ButtonConfig[] = [
    {
      action: (ev: MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        handleDialog();
      },
      title: t('Cerrar'),
    }
  ];

  const handleDriver = (item:SearchItem) => {
    setDriver(item)
  }

  const deleteSelected = (type:string) => {
    switch (type) {
      case 'container':
        setContainer(null)
      break
      case 'driver':
        setDriver(null)
      break
    }
  }

  const handleJourney = async () => {
    if (MxUserStore.user) {
      const userId = MxUserStore.user.id
      try {
        const created = await journeyApi.createJourney({ container, driver, step: actualStep, userId })
        setFormMessage(t('New journey created.'))
        setContainer(null)
        setDriver(null)
        setTimeout(() => {
          setFormMessage(undefined)
        }, 2000)

        if (created.data && socket) socket?.emit('journey:send_journey', { id: created.data.id});
        handleDialog();
      } catch (error) {
        console.error(error)
      }
    }
  }
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/')
  }

  useEffect(() => {
    const loadSteps = async () => {
      if(stepsList.length === 0) {
        const steps = await MxStepStore.handleSteps();
        MxStepStore.setStepsList(steps.data);
        const step = PageHelper.getStepInfoByRouteName(location.pathname, steps.data);
        setActualStep(step?.step);
      }
    };
    
    loadSteps();
  }, [stepsList.length]);

  return (
    <PageLayout
      seoTitle= {t('Gate')}
      title= {t('Gate')}
      buttonConfig= {{
        visible: true, 
        title: t('Go Back to main page'), 
        action: () => handleBack()}
      }>
      <MainContent>
        <TopWrapper>
          <Container maxWidth='sm'>
            <Card
              sx= {{
                px: 5,
                pt: 4,
                pb: 5
              }}
            >
              { formMessage && 
                <Alert severity="info">
                  {t(formMessage)}
                </Alert>
              }
              <Box mb={2} sx={{ display: 'flex' }}>
                <Avatar 
                  variant="square"
                  sx={{ 
                    bgcolor: theme.colors.primary.dark,
                    marginRight: 1
                  }}
                >
                  <LocalShipping />
                </Avatar>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1,
                    color: theme.colors.primary.dark
                  }}
                >
                  {t('New journey')}
                </Typography>
              </Box>
              { container && 
                <SelectedCard>
                  <Typography
                    variant="h4"
                  >
                    {t('Container')}: { container.containerNumber }
                  </Typography>
                  <IconButton edge="end" onClick={() => deleteSelected("container")}>
                    <DeleteIcon sx={{ color: "#FFFFFF" }} />
                  </IconButton>
                </SelectedCard>
              }

              { driver && 
                <SelectedCard>
                  <Typography
                    variant="h4"
                  >
                    {t('Driver')}: { driver.name }
                  </Typography>
                  <IconButton edge="end" onClick={() => deleteSelected("driver")}>
                    <DeleteIcon sx={{ color: "#FFFFFF" }} />
                  </IconButton>
                </SelectedCard>
              }
              
              { container && driver && 
                <Button 
                  sx={{ mt: 1 }}
                  variant="contained" 
                  onClick={handleJourney}
                >
                  { t('Save journey') }
                </Button>
              }

              {/* forms */}
              { !container && 
                <SearchForm 
                  searchType="containers"
                  formTitle="Search containers"
                  sendSelected={(container) => handleContainer(container)} 
                />
              }
              { !driver && 
                <SearchForm 
                  searchType="drivers"
                  formTitle="Search drivers"
                  sendSelected={(driver) => handleDriver(driver)} 
                />
              }
            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
      <CustomDialog
        isOpen={openDialog}
        type="success"
        header={t('Ha iniciado el flujo del contenedor')}
        configBtn={dialogButtons}
      />
    </PageLayout>
  )
}

export default observer(Gate)
