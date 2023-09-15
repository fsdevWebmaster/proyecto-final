import {
  Box,
  Button,
  Card,
  Container,
  IconButton,
  Typography,
  styled
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { GoalForm } from "@components/GoalForm/GoalForm";
import { SearchForm } from "@components/Search/SearchForm";
import { ContainerModel } from "@models/Container/Container";
import { useEffect, useState } from "react";
import { SearchItem, useSearch } from "@components/Search/useSearch";


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
    
    console.log("Send data to endpoint:",  { container, driver } )

  }

  return (
    <>
      <Helmet>
        <title>{t('Portería')}</title>
      </Helmet>
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
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1
                  }}
                >
                  {t('Portería')}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 1
                  }}
                >
                  {t('Nuevo recorrido')}
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
                    backgroundColor: "#f5f5f5",
                    borderRadius: "5px"
                  }}
                >
                  <Typography
                    variant="h4"
                  >
                    Contenedor: { container.containerNumber }
                  </Typography>
                  <IconButton edge="end" onClick={() => deleteSelected("container")}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }

              { driver && 
                <Box 
                  px={4}
                  py={1}
                  mb={1}
                  sx={{ 
                    display: "flex", 
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "5px"
                  }}
                >
                  <Typography
                    variant="h4"
                  >
                    Conductor: { driver.name }
                  </Typography>
                  <IconButton edge="end" onClick={() => deleteSelected("driver")}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
              
              { container && driver && 
                <Button color="primary" onClick={handleJourney}>
                  Registrar entrada
                </Button>
              }

              {/* forms */}
              { !container && 
                <SearchForm 
                  searchType="containers"
                  formTitle="Buscar contenedores"
                  sendSelected={(container) => handleContainer(container)} 
                />
              }
              { !driver && 
                <SearchForm 
                  searchType="drivers"
                  formTitle="Buscar conductores"
                  sendSelected={(driver) => handleDriver(driver)} 
                />
              }

              {/* <GoalForm /> */}

            </Card>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  )
}

export default Goal;
