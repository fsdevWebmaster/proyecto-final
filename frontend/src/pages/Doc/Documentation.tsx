import React from 'react';
import { Grid, IconButton, ListItemText, TableCell, Tooltip, Typography, useTheme } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '@layouts/Page/PageLayout';
import CardItem from '@components/Cards/CardItem';
import { BasicTable } from '@components/Tables/BasicTable';
import { TableAction } from '@components/Tables/TableAction';
import { CardManager } from '@components/Cards/CardManager';
import { ProgressBar } from '@components/ProgressBar/ProgressBar';
import { TimelineLog } from '@components/Timeline/Timeline';
import { JourneyLog } from '@models/Journey/Log';

const Documentation = () => {
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
    status: 'Completed',
    date: new Date(),
    containerNumber: '#BPJ-496'
  },
  {
    step: 'Romana 1',
    value: '450kg',
    status: 'Completed',
    date: new Date(),
    containerNumber: '#BPJ-496'
  },
  {
    step: 'Chequeo 1',
    value: true,
    status: 'Completed',
    date: new Date(),
    containerNumber: '#BPJ-496'
  }  
];

  return (
    <PageLayout seoTitle='Documentation' title='Documentation' buttonConfig={{visible: false}}>
      {/* Cards */}
      <Grid item lg={8} md={6} xs={12}>
        <Grid item container direction="row">
          <Grid item sm={6} xs={12}>
            <ListItemText
              primary="Cards"
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
          <Grid item sm={6} xs={12}>
              <CardItem title='Card 1' iconType='success' topData='40'/>
          </Grid>
          <Grid item sm={6} xs={12}>
              <CardItem title='Card 2' iconType='error' topData='1200'/>
          </Grid>
          <Grid item sm={6} xs={12}>
              <CardItem title='Card 3' iconType='primary' topData='10+'/>
          </Grid>
          <Grid item sm={6} xs={12}>
              <CardItem title='Card 4' iconType='warning' topData='80%'/>
          </Grid>
        </Grid>
      </Grid>

      {/* Dashboard Cards */}
      <Grid item lg={8} md={6} xs={12}>
        <Grid item container direction="row">
          <Grid item sm={6} xs={12}>
            <ListItemText
              primary="Dashboard Cards"
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
          <Grid item xs={12} md={6}>
            <CardManager
              title='Title 1'
              subtitle='Here a subtitle to add info'
              actionHeader='Go to'
              imgPath='/static/images/illustrations/handshake.svg'
              clickHandler={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardManager
              title='Title 2'
              subtitle='Here a subtitle to add info'
              actionHeader='Go to'
              imgPath='/static/images/illustrations/moving.svg'
              clickHandler={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardManager
              title='Title 3'
              subtitle='Here a subtitle to add info'
              actionHeader='Go to'
              imgPath='/static/images/illustrations/analysis.svg'
              clickHandler={() => {}}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardManager
              title='Title 4'
              subtitle='Here a subtitle to add info'
              actionHeader='Go to'
              imgPath='/static/images/illustrations/businessman.svg'
              clickHandler={() => {}}
            />
          </Grid>          
        </Grid>
      </Grid>

      {/* Progress Bars */}
      <Grid item lg={8} md={6} xs={12}>
        <Grid item container direction="row">
          <Grid item sm={6} xs={12}>
            <ListItemText
              primary="Progress Bars"
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
          <Grid item xs={12} md={6}>
              <ProgressBar type='success' percentage={60} status='In progress' currentLocation='Station 2'/>
          </Grid>
          <Grid item xs={12} md={6}>
              <ProgressBar type='error' percentage={10} status='Overdue' currentLocation='Station 4'/>
          </Grid>
          <Grid item xs={12} md={6}>
              <ProgressBar type='warning' percentage={40} status='Delayed' currentLocation='Yard'/>
          </Grid>
          <Grid item xs={12} md={6}>
              <ProgressBar type='secondary' percentage={90} status='Arrived' currentLocation='Gate'/>
          </Grid>
        </Grid>
      </Grid>        

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


      {/* Timeline Log */}
      <Grid item lg={8} md={6} xs={12}>
        <Grid item container direction="row">
          <Grid item sm={6} xs={12}>
            <ListItemText
              primary="Timeline Log"
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
            <TimelineLog sx={{ height: 350}} logs={mockLogs}/>
          </Grid>
        </Grid>
      </Grid>      

    </PageLayout>
  );
};

export default Documentation;
