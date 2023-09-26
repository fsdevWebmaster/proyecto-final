import { SearchForm } from "@components/Search/SearchForm"
import { SearchItem } from "@components/Search/useSearch"
import { PageLayout } from "@layouts/Page/PageLayout"
import { ContainerModel } from "@models"
import { Box, Button, Card, Checkbox, FormControlLabel, Grid, IconButton, Typography, styled, useTheme } from "@mui/material"
import { SyntheticEvent, useState, useEffect } from 'react';
import { useTranslation } from "react-i18next"
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useNavigate } from "react-router"

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

const RevisionContainer = styled(Box)(
  () => `
  `
)

export const Check = () => {
  const {t} = useTranslation()
  const theme = useTheme()
  const navigate = useNavigate()
  const [selectedContainer, setSelectedContainer] = useState<ContainerModel | null>()
  const [selectedType, setSelectedType] = useState<string | null>()
  const [ctPat, setCtPat] = useState(false)
  const [previousOk, setPreviousOk] = useState(false)
  const [stamps, setStamps] = useState(false)
  const [title, setTitle] = useState<string | null>(null)
  const [buttonVisible, setButtonVisible] = useState(false)

  const mockRole:string = "check-one"
  const mockJourney = {
    id: "65007586b6efe051c2e12184",
    journey: "65007586b6efe051c2e1217d",
    step: {
      name: "Portería",
      order: 1,
      previous: null,
      next: "64f7a10aeb2116cb79ca7447",
      isActive: true,
      id: "64f7a092eb2116cb79ca7445"
    },
    stepValue: "4500 kg",
    user: "64da7c0f484e531a6eeebbfc",
    description: ""
  }

  useEffect(() => {
    if (selectedType) {
      
    }
  }, [])
  
  
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
    setSelectedType(type) 

    // console.log("ctPat", ctPat)
    // console.log("previousOk", previousOk)

    // console.log('visible:', buttonVisible)
    console.log('selectedType:', selectedType)

    switch (type) {
      case "load":
         setTitle(`${t("Load")}`)
      break;
      case "unload":
        setTitle(`${t("Unload")}`)
        // setButtonVisible(true)

        console.log("TODO: create exit step route and page")
        // navigate("/exit")
      break;
    }
  }

  const handleChecks = (e: SyntheticEvent<Element, Event>) => {
    const { checked, name } = e.target

    switch (name) {
      case "ct-pat":
        setCtPat(checked)
      break;
      case "previous":
        setPreviousOk(checked)
      break;
      case "stamps":
        setStamps(checked)
      break;
    }

    // console.log(buttonVisible)

    // console.log(name, checked)


    if (ctPat === true && previousOk === true) {

      // console.log("ctPat", ctPat)
      // console.log("previousOk", previousOk)

      // setButtonVisible(true)


    }

    // selectedContainer && (stamps === true && previousOk === true)

    // if (!checked) {
    //   setButtonVisible(false)
    // }
    



    // console.log("checked:", checked)
    // console.log("stamps:", stamps)
    // console.log("selectedContainer:", selectedContainer)
    // console.log("--------------------------------------------------------")

    
  }

  const handleSubmit = () => {
    let patchData:any = {
      journey: mockJourney.id,
      step: mockJourney.step.next,
    }
    if (mockRole === "check-one") {
      patchData = { ...patchData, value: { ctPat, previousOk } }
    }
    else {
      patchData = { ...patchData, value: { stamps, previousOk } }
    }
    console.log("TODO: patch to /journey:", patchData)
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

      { mockRole === "check-one" &&
        <ButtonsContainer>
          <Typography variant="h4">
            { title }
          </Typography>
          <Button onClick={() => handleType("load")}>
            <FileUploadIcon />
            Carga
          </Button>
          <Button onClick={() => handleType("unload")}>
            <FileDownloadIcon />
            Descarga
          </Button>
        </ButtonsContainer>
      }

      { selectedType === "load" && 
        <RevisionContainer>
          <Typography variant="h3">
            Revisión
          </Typography>
          { mockRole === "check-one" ?
            <FormControlLabel 
              control={<Checkbox />} 
              label={t("CT-PAT norm OK")}
              name="ct-pat"
              onChange={e => handleChecks(e)}
            />
          :
            <FormControlLabel 
              control={<Checkbox />} 
              label={t("Stamp information OK")}
              name="stamps"
              onChange={e => handleChecks(e)}
            />
          }
          <FormControlLabel 
            control={<Checkbox />} 
            label={t("Previous information OK")} 
            name="previous"
            onChange={e => handleChecks(e)}
          />
          { selectedContainer &&  
            <Button onClick={handleSubmit}>
              {t("Continue")}
            </Button>
          }
          { buttonVisible &&  
            <Button onClick={handleSubmit}>
              {t("Continue")}
            </Button>
          }
        </RevisionContainer>
      }
    </MainContent>
    </PageLayout>
  )
}