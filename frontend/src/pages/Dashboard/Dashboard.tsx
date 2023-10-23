import React, { useEffect } from 'react';
import {  Grid } from '@mui/material';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { PageLayout } from '@layouts/Page/PageLayout';
import { CardManager } from '@components/Cards/CardManager';
import { useNavigate } from 'react-router';
import { MxConfigStore, MxUserStore } from '@stores';
import { PagesStatus } from '../../types/common';
import { PageHelper } from '@helpers/pageHelper';

const Dashboard = (props: any) => {
  const { t }: { t: any } = useTranslation();
  const navigate = useNavigate();
  const { user } = MxUserStore;
  const { pagesStatus } = MxConfigStore;

  useEffect(() => {
    const allowedPages = PageHelper.allowedPagesByUserRoles(user?.roles!);
    if (allowedPages) MxConfigStore.setPagesStatus(allowedPages);
  }, []);

  return (
    <PageLayout seoTitle={t('Panel')} title={t('Panel')} buttonConfig={{ visible: false}}>
      {pagesStatus.map((page: PagesStatus) => {
        return (
          <Grid item xs={12} md={6} key={page.path}>
            <CardManager
              title={t(page.name)}
              subtitle={t(page.title)}
              actionHeader={t(page.name)}
              imgPath={page.svgPath}
              clickHandler={() => navigate(page.path)}
            />
          </Grid>          
        );
      })}
    </PageLayout>
  );
};

export default observer(Dashboard);
