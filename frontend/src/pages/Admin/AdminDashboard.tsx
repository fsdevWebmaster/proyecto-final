import { PageLayout } from '@layouts/Page/PageLayout'
import { MouseEvent, useEffect, useState } from "react";
import {
    Box,
    Card,
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    styled,
    useTheme
} from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useTranslation } from 'react-i18next'
import { TableAction } from '@components/Tables/TableAction';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { journeyApi } from '@services/api/journeyApi';
import { MxJourneyStore } from '../../stores/JourneyStore';
import { StepModel } from '@models/Step/Step';
import { ContainerModel } from '@models';



const MainContent = styled(Box)(
  () =>`
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
  `
)

const mockActiveJourneys: any[] = [
  {
    id: "65007586b6efe051c2e1217d",
    driver: "65007586b6efe051c2e12170",
    container: "65007586b6efe051c2e12171",
    step: {
      name: "Patio",
      order: 2,
      previous: "64f7a092eb2116cb79ca7445",
      next: "64f7a18ceb2116cb79ca7449",
      isActive: true,
      id: "64f7a10aeb2116cb79ca7447"      
    },
    createDate: new Date("2023-09-19 17:01:05"),
    containerNumber: "001",
    driverDoc: "1111"
  }
]



const AdminDashboard = () => {
  const { t } = useTranslation()
  const theme = useTheme();
  const navigate = useNavigate();
  const handleDetails = (e:MouseEvent<HTMLElement>, journey:any) => {

  }
  const stepId = MxJourneyStore.stepId;
  const { step } = useParams();

  interface StepData {
      driver: string,
      container: string,
      step: StepModel,
      createdAt: string,
      updatedAt: string,
      containerNumber: string,
      driverDoc: string,
      id: string
  }
 
  const [stepsData, setStepsData] = useState<StepData[]>([]);
  useEffect(() => {
    if (step) {
      journeyApi.getStepJourneys(step)
        .then((response) => {
          console.log(response);
          setStepsData(response.data);
          console.log(response.data);
          console.log(response.data.length);

        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [step]);


  const tableActions = [
    {
      title: t('Journey details'),
      name: t("details"),
      clickHandler: handleDetails,
      visible: true,
      icon: <NavigateNextIcon />,
      colors: {
        background: theme.colors.primary.lighter,
        color: theme.palette.primary.main,
      }
    },
  ];


  return(
    <Grid item xs={12}>
      <PageLayout seoTitle={t('Admin Dashboard')}
        title={t('Admin Dashboard')}
        buttonConfig={{
          visible: true, 
          title: t('Go back to Admin Journeys Dashboard'), 
          action: () => alert('To-do')}
      }>
        <MainContent>
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>{t('Container number')}</TableCell>
                    <TableCell align='center'>{t('Entry Date')}</TableCell>
                    <TableCell align='center'>{t('Details')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { stepsData.map((journey) => (
                    <TableRow key={journey.id}>
                      <TableCell align='center'>
                        {journey.containerNumber}
                      </TableCell>
                      <TableCell align='center'>
                        {journey.createdAt}
                      </TableCell>
                      <TableCell align="center">
                          <Typography noWrap>
                            {
                              tableActions.map(action => (
                                <TableAction
                                  title={action.title}
                                  key={`action-${action.title}`}
                                  clickHandler={(e) => action.clickHandler(e, journey)}
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
        </MainContent>
      </PageLayout>        
    </Grid>
  )
}

export default AdminDashboard;
