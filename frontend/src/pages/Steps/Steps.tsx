import React from 'react';
import { Grid, ListItemText, useTheme, TableCell, Typography } from '@mui/material';
import { TableAction } from '@components/Tables/TableAction';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '@layouts/Page/PageLayout';
import { TimelineLog } from '@components/Timeline/Timeline';
import { JourneyLog } from '@models/Journey/Log';
import { BasicTable } from '@components/Tables/BasicTable';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';



const Steps = () => {
  const { t }: { t: any } = useTranslation();
  const theme = useTheme();

  const tableHeaderOptions = {
    btnTitle: 'Add Item',
    onClickHandler: () => alert('custom implementation')
  };

  const headers = ['Header 1', 'Header 2', 'Header 3', 'Header 4', 'Actions'];
  const tableActions = [
    {
      title: 'Edit Item',
      clickHandler: () => {},
      visible: true,
      icon: <EditTwoToneIcon fontSize="small" />,
      colors: {
        background: theme.colors.primary.lighter,
        color: theme.palette.primary.main,
      }
    },
    {
      title: 'Delete Item',
      clickHandler: () => {},
      visible: true,
      icon: <DeleteTwoToneIcon fontSize="small" />,
      colors: {
        background: theme.colors.error.lighter,
        color: theme.palette.error.main,
      }      
    }
];


const mockLogs: JourneyLog[] = [
  {
    step: 'Patio',
    value: '',
    status: 'Completo',
    date: new Date(),
    containerNumber: '#BPJ-496'
  },
  {
    step: 'Romana 1',
    value: '450kg',
    status: 'Completo',
    date: new Date(),
    containerNumber: '#BPJ-496'
  },
  {
    step: 'Chequeo 1',
    value: true,
    status: 'Pendiente',
    date: new Date(),
    containerNumber: '#BPJ-496'
  },
  {
    step: 'Chequeo 2',
    value: true,
    status: 'Pendiente',
    date: new Date(),
    containerNumber: '#BPJ-496'
  },
  {
    step: 'Romana 2',
    value: true,
    status: 'Pendiente',
    date: new Date(),
    containerNumber: '#BPJ-496'
  },
  {
    step: 'Salida',
    value: true,
    status: 'Pendiente',
    date: new Date(),
    containerNumber: '#BPJ-496'
  }        
];

  return (
    <PageLayout seoTitle='Steps' title='Steps' buttonConfig={{visible: false}}>

            {/* Table */}
      <Grid item lg={8} md={6} xs={12}>
        <Grid item container direction="row">
          <Grid item sm={6} xs={12}>
            <ListItemText
              primary="Tables"
              primaryTypographyProps={{
                variant: 'h1',
                sx: {
                  ml: 2
                },
                noWrap: true
              }}
            />
          </Grid>
        </Grid>
        <Grid item container direction="row" spacing={4}>
          <Grid item xs={12}>
            <BasicTable header={t('List')} headerOptions={tableHeaderOptions} tableHeaders={headers} itemsPerPage={5} hasPagination>
              <TableCell align='center'>
                  <Typography variant="h5" noWrap>
                    {t('Info 1')}
                  </Typography>
              </TableCell>
              <TableCell align='center'>
                  <Typography variant="h5" noWrap>
                    {t('Info 2')}
                  </Typography>
              </TableCell>  
              <TableCell align='center'>
                  <Typography variant="h5" noWrap>
                    {t('Info 3')}
                  </Typography>
              </TableCell>
              <TableCell align='center'>
                  <Typography variant="h5" noWrap>
                    {t('Info 4')}
                  </Typography>
              </TableCell>
              <TableCell align='center'>
                {tableActions.map(action => (
                  <TableAction
                    title={action.title}
                    clickHandler={action.clickHandler}
                    icon={action.icon}
                    colors={action.colors}
                    visible={action.visible} />
                ) )}
              </TableCell>              
            </BasicTable>
          </Grid>
        </Grid>
      </Grid>    

    </PageLayout>
  );
};

export default Steps;
