import React from 'react';
import { observer } from 'mobx-react';
import { Grid } from '@mui/material';
import { PageLayout } from '@layouts/Page/PageLayout';

const Containers = () => {
  return (
    <PageLayout seoTitle='Container List' title='Containers' buttonConfig={{visible: false}}>
      <Grid item>
        <p>Here the content</p>
      </Grid>
    </PageLayout>
  );
}

export default observer(Containers);