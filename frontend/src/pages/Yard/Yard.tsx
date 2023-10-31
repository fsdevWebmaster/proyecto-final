
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Avatar, Box, Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Typography, useTheme
} from "@mui/material"
import FastForwardIcon from '@mui/icons-material/FastForward';
import RedoIcon from '@mui/icons-material/Redo';
import { PageLayout } from "@layouts/Page/PageLayout"
import { JourneyModel } from "@models/Journey/Journey";
import { StepModel } from '@models/Step/Step';
import { journeyApi } from '@services/api/journeyApi';
import { MxStepStore, MxUserStore } from '@stores';
import { StepJourney } from '@models/Step/StepJourney';
import { observer } from 'mobx-react';
import { LocalShipping, Warehouse } from '@mui/icons-material';


const Yard = () => {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();
  const { stepsList } = MxStepStore
  const { user } = MxUserStore
  const [actualStep, setActualStep] = useState<StepJourney | undefined>(undefined)
  const [actualStepsList, setActualStepsList] = useState<StepModel[]>([])  

  const handleSendToScale = async (journey:JourneyModel, step: StepModel) => {
    if (user) {
      const updData = {
        journey: journey.id,
        step: step.next,
        value: "",
        status: "IN_PROGRESS",
        userId: user.id
      }
      if (actualStep) {
        const journeysLeft = actualStep.journeys.filter(j => j.id !== journey.id)
        setActualStep({ ...actualStep, journeys: journeysLeft })
        await journeyApi.updateJourney(updData)
      }      
    }
    else {

    }
  }

  useEffect(() => {
    if (stepsList.length > 0) {
      const routeName = location.pathname
      const route = routeName.split('/')[1]
      const actualStep = stepsList.find(item => item.step.routeName === route)
      setActualStep(actualStep)
    }
  }, [stepsList])
  

  return (
    <PageLayout
      seoTitle={t('Users List')}
      title={t('Yard')}
      buttonConfig={{
        visible: false,
        title: t('Create User'),
        action: () => alert('To-do')}
    }>

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', marginBottom: 2 }}>
          <Avatar 
            variant="square"
            sx={{ 
              marginRight: 1,
              backgroundColor: theme.colors.primary.dark 
            }}

          >
              <Warehouse />
          </Avatar>
          <Typography variant='h3' color={theme.colors.primary.dark}>
            On hold containers
          </Typography>
        </Box>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ color: theme.colors.primary.dark }}>
                    {t('Container number')}
                  </TableCell>
                  <TableCell align="center" sx={{ color: theme.colors.primary.dark }}>
                    {t('Actions')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { actualStep && actualStep.journeys.map((journey) => (
                  <TableRow key={ journey.id }>
                    <TableCell align='center'>
                      <Typography>
                        { journey.containerNumber }
                      </Typography>
                    </TableCell>
                    <TableCell 
                      align='center' 
                      onClick={ () => handleSendToScale(journey, actualStep.step) }
                    >
                      <Typography>Send to scale 1</Typography>
                      <FastForwardIcon />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>      
      </Grid>
    </PageLayout>
  )
}

export default observer(Yard);
