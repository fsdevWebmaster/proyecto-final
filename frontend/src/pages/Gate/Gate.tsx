import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Typography,
  styled,
  useTheme
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { SearchForm } from "@components/Search/SearchForm";
import { ContainerModel } from "@models/Container/Container";
import { useEffect, useState } from "react";
import { SearchItem, useSearch } from "@components/Search/useSearch";
import { PageLayout } from "@layouts/Page/PageLayout";
import { journeyApi } from "@services/api/journeyApi";
import { MxJourneyStore, MxStepStore } from "@stores";
import { observer } from 'mobx-react';
import { toJS } from "mobx";
import { useLocation } from "react-router";
import { StepModel } from "@models/Step/Step";
const { stepsList } = MxStepStore

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

  const [container, setContainer] = useState<SearchItem | null>()
  const [driver, setDriver] = useState<SearchItem | null>()
  const [formMessage, setFormMessage] = useState<string | undefined>(undefined)
  const [actualStep, setActualStep] = useState<StepModel | undefined>(undefined)
  const [actualStepsList, setActualStepsList] = useState<StepModel[]>([])

  const handleContainer = (item:SearchItem) => {
    setContainer(item)
  }

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
    const created = await journeyApi.createJourney({ container, driver, step: actualStep })
    setFormMessage(t('New journey created.'))
    setContainer(null)
    setDriver(null)

    console.log("TODO: update driver's UI", created)
  }

  
  useEffect(() => {
    const sList = toJS(stepsList)
    let stpList:StepModel[] = []
    const routeName = location.pathname
    const actualStep = sList.find(item => {
      stpList = [...stpList, item.step]
      if (routeName.includes(item.step.routeName)) {
        return item.step
      }
    })
    if(sList && actualStep){
      setActualStepsList(stpList)
      setActualStep(actualStep.step)
    }
  }, [])
  

  return (
    <PageLayout
      seoTitle='Gate'
      title='Gate'
      buttonConfig={{
        visible: false, 
        title: 'Create User', 
        action: () => alert('To-do')}
      }>
      <MainContent>
        <TopWrapper>
          <Container maxWidth='sm'>
            <Card
              sx={{
                px: 5,
                pt: 4,
                pb: 5
              }}
            >
              <Box mb={2}>
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
    </PageLayout>
  )
}

export default observer(Gate)
