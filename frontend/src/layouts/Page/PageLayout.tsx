import React, { ReactNode } from 'react';
import { PageHeader, PageTitleWrapper } from '@components'
import { Button, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { IPageHeaderProps } from '@common/interfaces';

interface IPageLayoutProps extends IPageHeaderProps {
  children?: ReactNode;
  seoTitle: string;
  icon?: React.ReactNode;
  buttonConfig?: {
    visible: boolean;
    action?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
    color?: string;
    icon?: React.ReactNode;
  };
  backButtonConfig?: {
    visible: boolean;
    action?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
    title?: string;
    color?: string;
    icon?: React.ReactNode;
  }
}

export const PageLayout = ({ children, seoTitle, title, subtitle, icon, buttonConfig, backButtonConfig }: IPageLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={title} subtitle={subtitle} icon={icon} sx={{
          '& .lineUp': {
            animation: '3s anim-lineUp ease-out',
          },
          '@keyframes anim-lineUp': {
            "0%": {
              opacity: 0,
              transform: 'translateY(80%)',
            },
            "20%": {
              opacity: 0,
            },
            "50%": {
              opacity: 1,
              transform: 'translateY(0%)',
            },
            "100%": {
              opacity: 1,
              transform: 'translateY(0%)',
            }
          }
        }} />

        {buttonConfig?.visible && (
          <Button
          sx={{
            mt: { xs: 0 }
          }}
            onClick={buttonConfig.action}
            variant="contained"
            color='primary'
            startIcon={buttonConfig.icon || undefined}
          >
            {buttonConfig.title}
          </Button>
        )}
        {backButtonConfig?.visible && (
          <Button
            sx={{
              mt: { xs: 0 }
            }}
            onClick={backButtonConfig.action}
            variant="contained"
            startIcon={backButtonConfig.icon || undefined}
            color='secondary'
          >
            {backButtonConfig.title}
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