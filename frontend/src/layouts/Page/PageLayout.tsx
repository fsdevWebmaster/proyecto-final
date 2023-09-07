import React, { ReactNode } from 'react';
import { PageHeader, PageTitleWrapper } from '@components'
import { Button, Grid } from '@mui/material';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { Helmet } from 'react-helmet-async';
import { IPageHeaderProps } from '@common/interfaces';

interface IPageLayoutProps extends IPageHeaderProps {
  children?: ReactNode;
  seoTitle: string;
  buttonConfig: {
    visible: boolean;
    action?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
  }
}

export const PageLayout = ({ children, seoTitle, title, subtitle, icon, buttonConfig }: IPageLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={title} subtitle={subtitle} icon={icon}/>

        {buttonConfig.visible && (
          <Button
            sx={{
              mt: { xs: 0 }
            }}
            onClick={buttonConfig.action}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            {buttonConfig.title}
          </Button>
        )}
      </PageTitleWrapper>
      <Grid
        sx={{
          px: 4
        }}
        container
        direction="row"
        // justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        {children}  
      </Grid>      
    </>
  );
}