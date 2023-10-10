import { Alert, Avatar, Box, Card, Grid, ListItem, ListItemAvatar, ListItemText, Typography, styled } from "@mui/material";
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { PageLayout } from "@layouts/Page/PageLayout";
import { TimelineLog } from "@components/Timeline/Timeline";
import { JourneyLog } from "@models/Journey/Log";
import { StepModel } from "@models/Step/Step";
import { JourneyModel } from "@models/Journey/Journey";


const DriverDashboard = () => {
  const { t } = useTranslation();

  const mockSteps: StepModel[] = [
    {
        "name": "Portería",
        "order": 1,
        "previous": null,
        "next": "64f7a10aeb2116cb79ca7447",
        "isActive": true,
        "id": "64f7a092eb2116cb79ca7445"
    },
    {
        "name": "Patio",
        "order": 2,
        "previous": "64f7a092eb2116cb79ca7445",
        "next": "64f7a18ceb2116cb79ca7449",
        "isActive": true,
        "id": "64f7a10aeb2116cb79ca7447"
    },
    {
        "name": "Romana 1",
        "order": 3,
        "previous": "64f7a10aeb2116cb79ca7447",
        "next": "64f7bd60eb2116cb79ca7471",
        "isActive": true,
        "id": "64f7a18ceb2116cb79ca7449"
    },
    {
        "name": "Chequeo 1",
        "order": 4,
        "previous": "64f7a18ceb2116cb79ca7449",
        "next": null,
        "isActive": true,
        "id": "64f7bd60eb2116cb79ca7471"
    }
  ]
  const mockJourney: JourneyModel = {
    "driver": "64dbeb400422576f15717ada",
    "container": "64dc0fe53ad970d6e4d9c951",
    "step":   {
      "name": "Chequeo 1",
      "order": 4,
      "previous": "64f7a092eb2116cb79ca7445",
      "next": {
        "name": "CT-PAT",
        "order": 5,
        "previous": "64f7a092eb2116cb79ca7445",
        "next": null,
        "isActive": true,
        "id": "64f7a10aeb2116cb79ca7447"
      },
      "isActive": true,
      "id": "64f7a10aeb2116cb79ca7447"
    },
    "containerNumber": "001",
    "driverDoc": "1111",
    "id": "65007586b6efe051c2e1217d"
  }
  const mockLogs: JourneyLog[] = [
      {
          "id": "65007586b6efe051c2e12183",
          "journey": "65007586b6efe051c2e1217d",
          "step": {
            "name": "Portería",
            "order": 1,
            "previous": null,
            "next": "64f7a10aeb2116cb79ca7447",
            "isActive": true,
            "id": "64f7a092eb2116cb79ca7445"
          },
          "stepValue": null,
          "user": "64da7c0f484e531a6eeebbfc",
          "description": ""
      },
      {
        "id": "65007586b6efe051c2e12184",
        "journey": "65007586b6efe051c2e1217d",
        "step": {
          "name": "Patio",
          "order": 2,
          "previous": null,
          "next": "64f7a10aeb2116cb79ca7447",
          "isActive": true,
          "id": "64f7a092eb2116cb79ca7445"
        },
        "stepValue": null,
        "user": "64da7c0f484e531a6eeebbfc",
        "description": ""
      },
      {
        "id": "65007586b6efe051c2e12184",
        "journey": "65007586b6efe051c2e1217d",
        "step": {
          "name": "Romana 1",
          "order": 3,
          "previous": null,
          "next": "64f7a10aeb2116cb79ca7447",
          "isActive": true,
          "id": "64f7a092eb2116cb79ca7445"
        },
        "stepValue": "4500 kg",
        "user": "64da7c0f484e531a6eeebbfc",
        "description": ""
      }

  ]


  return (
    <PageLayout
      seoTitle={t('Drivers dashboard')}
      title={t('Drivers dashboard')}
      buttonConfig={{
        visible: false, 
        title: t('Create User'), 
        action: () => alert('To-do')}
    }>
      
      <Grid item lg={4} md={6} xs={12}>
        <Grid item container direction="row">
          <Card sx={{ px: 1, pr: 3, mt: 3, width: "33%" }} >
            <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "green" }}>
                    <KeyboardDoubleArrowRightOutlinedIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={mockJourney.step.name} 
                  primaryTypographyProps={{fontSize: 20, fontWeight: "bold"}}
                  secondary={t('Actual step')} 
                />
            </ListItem> 
          </Card>
          <Card sx={{ px: 1, pr: 3, ml: 1, mt: 3, width: "33%" }} >
            <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <KeyboardDoubleArrowRightOutlinedIcon/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={mockJourney.step.next?.name} 
                  primaryTypographyProps={{fontSize: 20, fontWeight: "bold"}}
                  secondary={t('Next step')} 
                />
            </ListItem> 
          </Card>
        </Grid>
      </Grid>  
      <Grid item lg={8} md={6} xs={12}>
        <Grid item container direction="row">
          <Grid item sm={6} xs={12}>
            <ListItemText
              primary="Journey"
              primaryTypographyProps={{
                variant: 'h1',
                sx: {
                  ml: 2,
                  mt: 1
                },
                noWrap: true
              }}
            />
          </Grid>
        </Grid>
        <Grid item container direction="row" spacing={4}>
          <Grid item xs={12}>
            <TimelineLog sx={{ height: 350}} logs={mockLogs}/>
          </Grid>
        </Grid>
      </Grid>  
    </PageLayout>
  )
}

export default DriverDashboard;