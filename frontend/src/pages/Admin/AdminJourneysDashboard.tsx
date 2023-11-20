import { Table, Box,Card,Container,Typography,styled,Grid,TableCell,useTheme, TableRow, TableContainer, TableHead , TableBody } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { TableAction } from '@components/Tables/TableAction';
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react';
import { stepApi } from '@services/api/stepApi';
import { StepModel } from '@models/Step/Step';
import { Link, useNavigate } from 'react-router-dom';
import { MxJourneyStore } from '../../stores/JourneyStore';
import { PageLayout } from '@layouts/Page/PageLayout';

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
    display: flex;
    width: 100%;
    flex: 1;
    padding: 20px
    `
)

const AdminJourneysDashboard = () => {
  const navigate = useNavigate();
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  interface StepData {
    step: {
      id: string
      name: string
      url: string
      order: number
      previous: StepModel | string | null
      next: StepModel | string | null
      routeName: string
      isActive: boolean
    };
    journeys: {
      
    }[];
  }
  const [stepsData, setStepsData] = useState<StepData[]>([]);

  useEffect(() => {
    stepApi.getSteps()
      .then((response) => {
        setStepsData(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleTableActionClick = (stepId: string, stepName: string) => {
    MxJourneyStore.setStepId(stepId); 
    MxJourneyStore.setStepName(stepName); 
    navigate(`/admin-dashboard/${stepId}`)

  };
  

  const tableActions = stepsData.map((stepData) => ({
    title: 'View Containers',
    stepId: stepData.step.id,
    visible: true,
    icon: <NavigateNextIcon fontSize="small" />,
    colors: {
      background: theme.colors.primary.lighter,
      color: theme.palette.primary.main,
    },
  }));
  
  const handleBack = () => {
    navigate('/')
  }

  return(
    <PageLayout 
      seoTitle={'Admin Journeys Dashboard'} 
      title={'Admin Journeys Dashboard'}
      backButtonConfig={{
        visible : true,
        title: t('Go Back to main page'),
        action: () => handleBack()
      }}
      >
      <Helmet>
        <title>{t('Admin Journeys Dashboard')}</title>
      </Helmet>


   

       {/* Table */}
       <Grid padding={2} item lg={12} md={12} xs={12}>
        <TopWrapper>
          <Container maxWidth="lg">
            <Card
              sx={{
                mt: 3,
                px: 4,
                pt: 5,
                pb: 3
              }}
            >
              <Box textAlign={'center'}>
                <Typography
                  variant='h2'
                  sx={{
                    mb: 1
                  }}
                >
                  {t('Containers in Stations')}
                </Typography>
              </Box>
            </Card>
          </Container>
        </TopWrapper>
       <Card>
          <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Step</TableCell>
                        <TableCell align="center">Containers</TableCell>

                        <TableCell align="center">See Containers in Station</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                  {tableActions.map((action) => (
                    <TableRow key={action.stepId}>
                      <TableCell align='center'>
                        <Typography variant="h5" noWrap>
                        {t(stepsData.find(stepData => stepData.step.id === action.stepId)?.step.name)}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography variant="h5" noWrap>
                        {t(stepsData.find(stepData => stepData.step.id === action.stepId)?.journeys.length)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography noWrap>
                            <TableAction
                              title={action.title}
                              icon={action.icon}
                              colors={action.colors}
                              visible={action.visible}
                              clickHandler={(e) => handleTableActionClick(action.stepId, stepsData.find(stepData => stepData.step.id === action.stepId)?.step.name || '')}
                            />
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

export default AdminJourneysDashboard;
