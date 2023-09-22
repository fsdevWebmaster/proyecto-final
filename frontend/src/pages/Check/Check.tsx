import { SearchForm } from "@components/Search/SearchForm"
import { SearchItem } from "@components/Search/useSearch"
import { PageLayout } from "@layouts/Page/PageLayout"
import { ContainerModel } from "@models"
import { Box, Button, Card, Grid, IconButton, Typography, styled, useTheme } from "@mui/material"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';

const SearchContainer = styled(Box)(
  () => `
    width: 100%;
    margin-bottom: 1em;
  `
)

const MainContent = styled(Box)(
  () =>`
      width: 100%;
      margin-left: 5%;
      margin-top: 1em;
      display: flex;
      flex: 1;
      flex-direction: column;
  `
)

const InfoContainer = styled(Box)(
  () => `
    margin-top: 1em;
  `
)

const MainRow = styled(Box)(
  () => `
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  `
)

const ButtonsContainer = styled(Box)(
  () => `
    display: flex;
    flex-direction: row;
  `
)

export const Check = () => {
  const t = useTranslation()
  const theme = useTheme()
  const [selectedContainer, setSelectedContainer] = useState<ContainerModel | null>()
  
  const handleSelected = (selected:SearchItem) => {
    setSelectedContainer(selected as ContainerModel)
  }

  const deleteSelected = (type:string) => {
    switch (type) {
      case "container":
        setSelectedContainer(null)
      break;
    }
  }

  const handleType = (type:string) => {
    switch (type) {
      case "load":
        
      break;
      case "unload":
        
      break;
    }
  }

  return (
    <PageLayout
      seoTitle='Check dashboard'
      title='Check dashboard'
      buttonConfig={{
        visible: false, 
        title: '', 
        action: () => alert('To-do')}
    }>
    <MainContent className="main-content" sx={{ marginTop: 2 }}>
      { !selectedContainer &&
        <SearchContainer>
          <SearchForm
            sendSelected={(selected) =>handleSelected(selected)}
            searchType="containers"
            formTitle="Seach containers"
          />
        </SearchContainer>
      }

      { selectedContainer && 
        <InfoContainer>
          <Typography variant="h4">
            Container
          </Typography>
          <Card sx={{ padding: 2, marginBottom: 2, marginTop: 1 }}>
            <MainRow className="main-row">
                <Typography variant="h4" width="50%">
                  <span>{selectedContainer?.containerNumber}</span>
                </Typography>
                <IconButton edge="end" onClick={() => deleteSelected('container')}>
                  <DeleteIcon sx={{ color: theme.colors.primary.dark }} />
                </IconButton>
            </MainRow>
          </Card>
        </InfoContainer>
      }

      <ButtonsContainer>
        <Button onClick={() => handleType("load")}>
          <FileUploadIcon />
          Carga
        </Button>
        <Button onClick={() => handleType("unload")}>
          <FileDownloadIcon />
          Descarga
        </Button>
      </ButtonsContainer>

    </MainContent>
    </PageLayout>
  )
}