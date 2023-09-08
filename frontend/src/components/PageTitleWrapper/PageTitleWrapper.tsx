import { FC, ReactNode } from 'react';
import { Box, styled } from '@mui/material';

const PageTitleStyled = styled(Box)(
  ({ theme }) => `
    padding: ${theme.spacing(4)};
`
);

interface PageTitleWrapperProps {
  children?: ReactNode;
}

export const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => {
  return (
    <>
      <PageTitleStyled
        className="MuiPageTitle-wrapper"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {children}
      </PageTitleStyled>
    </>
  );
};
