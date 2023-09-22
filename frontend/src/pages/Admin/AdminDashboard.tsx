import { PageLayout } from '@layouts/Page/PageLayout'
import { MouseEvent } from "react";
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

const MainContent = styled(Box)(
  () =>`
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
  `
)

// Journey[] type setted to any[] while merge approval
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
    // TODO: Handle
    // journeyStore.setCurrentJourney(journey)
    // navigate(`/journey-detail/${journey.id}`)
  }

  const tableActions = [
    {
      title: 'Journey details',
      name: "details",
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
      <PageLayout seoTitle='Admin Dashboard'
        title='Admin Dashboard'
        buttonConfig={{
          visible: false, 
          title: 'Create User', 
          action: () => alert('To-do')}
      }>
        <MainContent>
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>{t('Container number')}</TableCell>
                    <TableCell align='center'>{t('Entrance date')}</TableCell>
                    <TableCell align='center'>{t('Step')}</TableCell>
                    <TableCell align='center'>{t('Details')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { mockActiveJourneys.map((journey) => (
                    <TableRow key={journey.id}>
                      <TableCell align='center'>
                        {journey.containerNumber}
                      </TableCell>
                      <TableCell align='center'>
                        {journey.createDate.toDateString()}
                      </TableCell>
                      <TableCell align='center'>
                        {journey.step.name}
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
