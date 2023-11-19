import { PageLayout } from '@layouts/Page/PageLayout'
import { MouseEvent, useEffect, useState } from "react";
import {
    Box,
    Button,
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
import { ArrowBack } from '@mui/icons-material';
import { format } from 'date-fns';



const MainContent = styled(Box)(
  () =>`
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
  `
)

const AdminDashboard = () => {
  const { t } = useTranslation()
  const theme = useTheme();
  const navigate = useNavigate();
  const handleDetails = (e:MouseEvent<HTMLElement>, journey:any) => {
    navigate(`/journey-status/${journey.containerNumber}`);
  }
  const stepId = MxJourneyStore.stepId;
  const { step } = useParams();
  const [stepsData, setStepsData] = useState<StepData[]>([]);
  const stepName = MxJourneyStore.stepName;
  
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
    
    
    useEffect(() => {
      if (step) {
        journeyApi.getStepJourneys(step)
        .then((response) => {
          setStepsData(response.data);
        })
        .catch((error) => console.error('Error fetching data:', error));
      }
    }, [step]);
    
  
  const handleTableActionClick = () => {
    navigate(`/admin-journeys-dashboard/`)
  };
  
  const handleBack = () => {
    navigate('/')
  }

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
        subtitle={stepName}
        backButtonConfig={{
          visible: true, 
          title: t('Go back to main page'), 
          action: () => handleBack()}
      }
      >
        <MainContent padding={2}>
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
                {stepsData.map((journey) => {
                    
                    const journeyDate = new Date(journey.createdAt);

                    return (
                      <TableRow key={journey.id}>
                      <TableCell align='center'>
                        {journey.containerNumber}
                      </TableCell>
                      <TableCell align='center'>
                        {format(journeyDate, 'dd MMMM yyyy')}
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
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </MainContent>
      </PageLayout>        
        <Button
          variant='contained'
          startIcon={<ArrowBack />}
          sx={{ marginTop: '15px', marginLeft: '15px' }}
          onClick={handleTableActionClick}
          color='secondary'
        >
          {t('Go back to Admin Containers in statios')}
        </Button>
    </Grid>
  )
}

export default AdminDashboard;
