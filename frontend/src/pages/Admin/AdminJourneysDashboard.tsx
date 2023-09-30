import { Table, Box,Card,Container,Typography,styled,Grid,TableCell,ListItemText,useTheme, stepClasses, TableRow, TableContainer, TableHead , TableBody } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { TableAction } from '@components/Tables/TableAction';
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'


const mockJourneysContainers:any[] = [
    { stepName: "Yard", containersCount: "3" },
    { stepName: "Romana1", containersCount: "4" },
    { stepName: "Check1", containersCount: "7" }
  ]
   
// const journeyContainersSteps = () =>{
//     let step = mockJourneysContainers.map(stepName) =>{
        
// }
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
    const { t }: { t: any } = useTranslation();
    const theme = useTheme();
  
    const tableHeaderOptions = {
      btnTitle: 'Add Item',
      onClickHandler: () => alert('custom implementation')
    };
    const headers = ['Step', 'Containers', 'Actions'];

const tableActions = [
  {
    title: 'View',
    clickHandler: () => {},
    visible: true,
    icon: <OpenInNewIcon fontSize="small" />,
    colors: {
      background: theme.colors.primary.lighter,
      color: theme.palette.primary.main,
    }
  }
];
  

  return(
    <>
      <Helmet>
        <title>{t('Admin Journeys Dashboard')}</title>
      </Helmet>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="sm">
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
      </MainContent>

       {/* Table */}
       <Grid item lg={8} md={6} xs={12}>
       <Card>
          <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Step</TableCell>
                        <TableCell align="center">Containers</TableCell>

                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {mockJourneysContainers.map((mockJourneysContainer) => {
                    return (
                    <TableRow>
                    <TableCell align='center'>
                        <Typography variant="h5" noWrap>
                        {t( mockJourneysContainer.stepName)}
                        </Typography>
                    </TableCell>
                    <TableCell align='center'>
                        <Typography variant="h5" noWrap>
                        {t( mockJourneysContainer.containersCount)}
                        </Typography>
                    </TableCell>
                    <TableCell align="center">
                        <Typography noWrap>
                          {
                            tableActions.map(action => (
                              <TableAction
                                title={action.title}
                                key={`action-${action.title}`}
                                clickHandler={action.clickHandler}
                                icon={action.icon}
                                colors={action.colors}
                                visible={action.visible} />
                            ))
                          }
                        </Typography>
                      </TableCell>

                    </TableRow>
                    )
                })}
                </TableBody>
            </Table>
           </TableContainer>        
       </Card>

      </Grid>
    </>
  )
}

export default AdminJourneysDashboard;
