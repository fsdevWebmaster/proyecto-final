import { MouseEvent } from 'react';
import { useTranslation } from "react-i18next";
import { Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Typography, useTheme
} from "@mui/material"
import FastForwardIcon from '@mui/icons-material/FastForward';
import RedoIcon from '@mui/icons-material/Redo';
import { PageLayout } from "@layouts/Page/PageLayout"
import { TableAction } from "@components/Tables/TableAction";
import { Journey } from "@models/Journey/Journey";
import { JourneyLog } from '@models/Journey/Log';

export const Yard = () => {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const handleActions = (e: MouseEvent<HTMLElement>, actionName: string, journey:Journey) => {
    if (actionName === "next") {
      const newLog:JourneyLog = {
        journey: journey.id,
        step: journey.step.next,
        stepValue: null,
        user: "TODO: set logged user."
      }

      console.log("TODO: post journey", newLog)
    }
    else if (actionName === "other") {
      
      console.log("TODO: Select target step and justify the change.")

    }
  }

  const tableActions = [
    {
      title: 'Enviar a siguiente paso',
      name: 'next',
      clickHandler: handleActions,
      visible: true,
      icon: <FastForwardIcon />,
      iconText: "Siguiente paso",
      colors: {
        background: theme.colors.primary.lighter,
        color: theme.palette.primary.main,
      }
    },
    {
      title: 'Enviar a otro paso',
      name: 'other',
      clickHandler: handleActions,
      visible: true,
      icon: <RedoIcon />,
      iconText: "Otro paso",
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
      seoTitle='Users List'
      title='Patio'
      buttonConfig={{
        visible: true, 
        title: 'Create User', 
        action: () => alert('To-do')}
    }>
      <Grid item xs={12}>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">{t('Container number')}</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { mockJourneys && mockJourneys.map((journey:Journey) => (
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