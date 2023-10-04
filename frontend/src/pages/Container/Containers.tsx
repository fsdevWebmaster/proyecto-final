import React from 'react';
import { observer } from 'mobx-react';
import { PageLayout } from '@layouts/Page/PageLayout';
import { Table, Box, Card, Container, Typography,styled,Grid,TableCell,ListItemText,useTheme, stepClasses, TableRow, TableContainer, TableHead , TableBody } from '@mui/material'
import { TableAction } from '@components/Tables/TableAction';
import { useTranslation } from 'react-i18next';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const mockJourneysContainers:any[] = [
  { containersNumber: "3", entryDate: "12-12-2023"},
  { containersNumber: "4", entryDate: "03-03-2023"},
  { containersNumber: "7", entryDate: "05-03-2023"},
]
 
//const journeyContainersSteps = () =>{
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


const Containers = () => {
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

  return (
    <>
    <PageLayout seoTitle='Container List' title='Containers' buttonConfig={{ visible: false }}>
      <Grid item>
        <p>Container List</p>
      </Grid>
    </PageLayout><Grid item lg={8} md={6} xs={12}>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Container Number</TableCell>
                  <TableCell align="center">Entry Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {mockJourneysContainers.map((mockJourneysContainer) => {
                  return (
                    <TableRow>
                      <TableCell align='center'>
                        <Typography variant="h5" noWrap>
                          {t(mockJourneysContainer.containersNumber)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant='h5' noWrap>
                          {mockJourneysContainer.entryDate}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography noWrap>
                          {tableActions.map(action => (
                            <TableAction
                              title={action.title}
                              key={`action-${action.title}`}
                              clickHandler={action.clickHandler}
                              icon={action.icon}
                              colors={action.colors}
                              visible={action.visible} />
                          ))}
                        </Typography>
                      </TableCell>

                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

      </Grid></>
  );
}

export default observer(Containers);