import { useState } from 'react';
import { Avatar, Box, Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Typography, useTheme 
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { observer } from 'mobx-react';
import { PageLayout } from '@layouts/Page/PageLayout';
import { TableAction } from '@components/Tables/TableAction';
import { StationModel } from '@models/Station/Station';
import { CustomDialog } from '@components/Dialog/CustomDialog';
import { ButtonConfig } from '@common/interfaces';
import { CreateStation } from '@components/Dialog/CreateStation';
import { useTranslation } from 'react-i18next';

const Stations = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openCUDialog, setCUDialog] = useState(false);
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const station: StationModel[] = [
    {
      id: '11',
      name: 'Romana I',
      status: true,
    },
    {
      id: '12',
      name: 'Romana II',
      status: false,
    }
  ];

  const tableActions = [
    {
      title: t('Edit Station'),
      clickHandler: () => {},
      visible: true,
      icon: <EditTwoToneIcon fontSize="small" />,
      colors: {
        background: theme.colors.primary.lighter,
        color: theme.palette.primary.main,
      }
    },
    {
      title: t('Delete Station'),
      clickHandler: () => { setOpenDialog(true)},
      visible: true,
      icon: <DeleteTwoToneIcon fontSize="small" />,
      colors: {
        background: theme.colors.error.lighter,
        color: theme.palette.error.main,
      }      
    }
];

const onCreateStationHandler = async () => {
  alert('TO-DO call API')
};

const onCloseCUHandler = () => setCUDialog(false);

const dialogButtons: ButtonConfig[] = [
  {
    title: t('Cancel'),
    action: () => {
      setOpenDialog(false);
    },
    sx: {
      mx: 1
    }
  },
  {
    title: t('Disable Station'),
    action: () => alert('To do'),
    sx: {
      mx: 1,
      px: 3,
      background: theme.colors.error.main,
      color: theme.palette.success.contrastText,
      '&:hover': {
         background: theme.colors.error.dark,
      }      
    }
  }
];

  return (
    <PageLayout
      seoTitle={t('Station List')}
      title={t('Stations Management')}
      buttonConfig={{
        visible: true, 
        title: t('Create Station'),
        action: () => setCUDialog(true)}
      }>
      <Grid item xs={12}>
        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">{t('ID')}</TableCell>
                  <TableCell align="center">{t('Name')}</TableCell>
                  <TableCell align="center">{t('Status')}</TableCell>
                  <TableCell align="center">{t('Actions')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {station.map((station) => {

                  return (
                    <TableRow hover key={station.id}>
                      <TableCell align='center'>
                        <Typography variant="h5">
                          {station.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            sx={{
                              fontSize: `${theme.typography.pxToRem(15)}`,
                              background: `${theme.colors.warning.main}`,
                              color: `${theme.palette.getContrastText(
                                theme.colors.warning.dark
                              )}`,
                              width: 45,
                              height: 45,
                              mr: 1
                            }}
                          >
                            GA
                          </Avatar>                          
                          <Box>
                            <Typography noWrap variant="subtitle2" align="center">
                              {station.name}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap variant="subtitle2" align="center">
                          {/* {station.status} */}
                          {station.status ? t('Active') : t('Inactive')}
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
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>          
        </Card>
      </Grid>
      <CustomDialog isOpen={openDialog} type="error" header="Disable Station" configBtn={dialogButtons} onCloseHandler={() => setOpenDialog(false)}/>
      <CreateStation isOpen={openCUDialog} onCloseHandler={onCloseCUHandler} onSuccessHandler={onCreateStationHandler}/>
    </PageLayout>
  );
};

export default observer(Stations);
