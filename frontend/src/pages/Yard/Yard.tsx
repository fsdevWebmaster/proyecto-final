import { MouseEvent, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Typography, useTheme
} from "@mui/material"
import FastForwardIcon from '@mui/icons-material/FastForward';
import RedoIcon from '@mui/icons-material/Redo';
import { PageLayout } from "@layouts/Page/PageLayout"
import { TableAction } from "@components/Tables/TableAction";
import { JourneyModel } from "@models/Journey/Journey";
import { JourneyLog } from '@models/Journey/Log';
import { StepModel } from '@models/Step/Step';

export const Yard = () => {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const handleActions = (e: MouseEvent<HTMLElement>, actionName: string, journey:JourneyModel) => {
    if (actionName === "next" && journey.step.next) {
      const newLog:JourneyLog = {
        id: "x",
        journey: journey.id,
        step: journey.step.next as StepModel,
        stepValue: null,
        user: "TODO: set logged user.",
        description: ""
      }

      console.log("TODO: post journey", newLog)
    }
    else if (actionName === "other") {
      
      console.log("TODO: Select target step and justify the change.")

    }
  }

  const tableActions = [
    {
      title: t('Enviar a siguiente paso'),//Send to next step
      name: 'next',
      clickHandler: handleActions,
      visible: true,
      icon: <FastForwardIcon />,
      iconText: t('Siguiente paso'), //Next step
      colors: {
        background: theme.colors.primary.lighter,
        color: theme.palette.primary.main,
      }
    },
    {
      title: 'Enviar a otro paso', //'Send to another step'
      name: 'other',
      clickHandler: handleActions,
      visible: true,
      icon: <RedoIcon />,
      iconText: t('Another step'),
      colors: {
        background: theme.colors.primary.lighter,
        color: theme.palette.primary.main,
      }
    }
  ]

  const mockJourneys = [
    {
      driver: "64dbeb400422576f15717ada",
      container: "64dc0fe53ad970d6e4d9c951",
      step: {
        name: "Patio",
        order: 2,
        previous: "64f7a092eb2116cb79ca7445",
        next: "64f7a18ceb2116cb79ca7449",
        isActive: true,
        id: "64f7a10aeb2116cb79ca7447"
      },
      containerNumber: "001",
      driverDoc: "1111",
      id: "65007586b6efe051c2e1217d"
    }
  ]

  return (
    <PageLayout
      seoTitle={t('Users List')}
      title={t('Yard')}
      buttonConfig={{
        visible: true,
        title: t('Create User'),
        action: () => alert('To-do')}
    }>
      <Grid item xs={12}>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">{t('Container number')}</TableCell>
                  <TableCell align="center">{t('Actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { mockJourneys && mockJourneys.map((journey:JourneyModel) => (
                  <TableRow key={journey.id}>
                    <TableCell align="center">
                      <Typography>
                        {journey.containerNumber}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography noWrap>
                        {
                          tableActions.map(action => (
                            <TableAction
                              title={action.title}
                              name={action.name}
                              journey={journey}
                              iconText={action.iconText}
                              key={`action-${action.name}`}
                              clickHandler={(e:MouseEvent<HTMLElement>, name:string) => 
                                  action.clickHandler(e, action.name, journey)
                              }
                              icon={action.icon}
                              colors={action.colors}
                              visible={action.visible} />
                          ))
                        }
                      </Typography>
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