import {  CardActionArea, Grid } from '@mui/material';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '@layouts/Page/PageLayout';
import { CardManager } from '@components/Cards/CardManager';
import { useNavigate } from 'react-router';
import { MxStepStore, MxUserStore } from '@stores';

const Dashboard = (props: any) => {
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();

  return (
    <PageLayout seoTitle={t('Panel')} title={t('Panel')} buttonConfig={{ visible: false}}>
      <Grid item container direction="row" spacing={4}>
          <Grid item xs={12} md={6}>
            {/* <Grid item container direction="row" spacing={4}> */}
            <CardManager
              title={t('Gate page')}
              subtitle={t('Go to gate page')}
              actionHeader={t('Gate page')}
              imgPath='/static/images/illustrations/handshake.svg'
              clickHandler={() => navigate('gate')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardManager
              title={t('Scale One page')}
              subtitle={t('Go to scale one page')}
              actionHeader={t('Scale one page')}
              imgPath='/static/images/illustrations/handshake.svg'
              clickHandler={() => navigate('scale-one')}
            />
          </Grid>          
        <Grid item container direction="row" spacing={4}>
          <Grid item xs={12} md={6}>
            <CardManager
              title={t('Check One page')}
              subtitle={t('Go to check one page')}
              actionHeader={t('Check page')}
              imgPath='/static/images/illustrations/handshake.svg'
              clickHandler={() => navigate('check-one')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardManager
              title={t('Check Two page')}
              subtitle={t('Go to check two page')}
              actionHeader={t('Check page')}
              imgPath='/static/images/illustrations/handshake.svg'
              clickHandler={() => navigate('check-two')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardManager
              title={t('Scale Two page')}
              subtitle={t('Go to scale two page')}
              actionHeader={t('Scale two page')}
              imgPath='/static/images/illustrations/handshake.svg'
              clickHandler={() => navigate('scale-two')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardManager
              title='List Users'
              subtitle='Manage user information'
              actionHeader='Manage'
              imgPath='/static/images/illustrations/handshake.svg'
              clickHandler={() => navigate('users')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardManager
              title={t('List Containers')}
              subtitle={t('Manage containers flow')}
              actionHeader={t('Go to')}
              imgPath='/static/images/illustrations/moving.svg'
              clickHandler={() => navigate('containers')}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <CardActionArea onClick={() => navigate('stations')}> */}
              <CardManager
                title={t('List Stations')}
                subtitle={t('Manage stations flow')}
                actionHeader={t('Go to')}
                imgPath='/static/images/illustrations/analysis.svg'
                clickHandler={() => navigate('stations')}
              />
            {/* </CardActionArea> */}
          </Grid>
          <Grid item xs={12} md={6}>
            <CardManager
              title={t('Title 4')}
              subtitle={t('Here a subtitle to add info')}
              actionHeader={t('Go to')}
              imgPath='/static/images/illustrations/businessman.svg'
              clickHandler={() => {}}
            />
          </Grid>          
        </Grid>
    </PageLayout>
  );
};

export default observer(Dashboard);
