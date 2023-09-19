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
import { GoalForm } from "@components/GoalForm/GoalForm";
import { SearchForm } from "@components/Search/SearchForm";
import { ContainerModel } from "@models/Container/Container";
import { useEffect, useState } from "react";
import { SearchItem, useSearch } from "@components/Search/useSearch";
import { PageLayout } from "@layouts/Page/PageLayout";


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
    width: 100%
    flex: 1;
    padding: 20px;
  `
)

const Goal = () => {
  const { t } = useTranslation()
  const theme = useTheme();
  const [container, setContainer] = useState<SearchItem | null>()
  const [driver, setDriver] = useState<SearchItem | null>()

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

  const handleJourney = () => {
    
    console.log("TODO: Send data to endpoint:",  { container, driver } )

  }

  return (
    <PageLayout
      seoTitle='Gate'
      title='Gate'
      buttonConfig={{
        visible: true, 
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
                <Box 
                  px={4}
                  py={1}
                  mb={1}
                  sx={{ 
                    display: "flex", 
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#FFFFFF",
                    bgcolor: theme.colors.secondary.light,
                    borderRadius: "5px"
                  }}
                >
                  <Typography
                    variant="h4"
                  >
                    Contenedor: { container.containerNumber }
                  </Typography>
                  <IconButton edge="end" onClick={() => deleteSelected("container")}>
                    <DeleteIcon sx={{ color: "#FFFFFF" }} />
                  </IconButton>
                </Box>
              }

              { driver && 
                <Box 
                  px={4}
                  py={1}
                  mb={2}
                  sx={{ 
                    display: "flex", 
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#FFFFFF",
                    bgcolor: theme.colors.secondary.light,
                    borderRadius: "5px"
                  }}
                >
                  <Typography
                    variant="h4"
                  >
                    Conductor: { driver.name }
                  </Typography>
                  <IconButton edge="end" onClick={() => deleteSelected("driver")}>
                    <DeleteIcon sx={{ color: "#FFFFFF" }} />
                  </IconButton>
                </Box>
              }
              
              { container && driver && 
                <Button 
                  sx={{ mt: 1 }}
                  variant="contained" 
                  onClick={handleJourney}
                >
                  Registrar entrada
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

export default Goal;
