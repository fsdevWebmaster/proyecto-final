import React, {MouseEvent, ReactNode, useCallback} from 'react';
import { Button, Card, CardActions, CardHeader, Divider, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import { Generic } from './types';
import { Headers } from './Headers';

type HeaderActionProps = {
  btnTitle: string;
  onClickHandler: (ev: MouseEvent<HTMLButtonElement>) => void;
}

interface IBasicTableProps {
  header: string;
  headerOptions: HeaderActionProps;
  hasPagination?: boolean;
  itemsPerPage?: number;
  tableHeaders: string[];
  children: ReactNode;
}

export const BasicTable = ({header, headerOptions, hasPagination, itemsPerPage, tableHeaders, children}:IBasicTableProps) => {
  const theme = useTheme();

  if (!tableHeaders) {
    throw new Error("Table Headers required");
  }
  

  return (
    <Card>
      <CardHeader
        title={header}
        action={
          <Button
            variant="outlined"
            size="small"
            endIcon={<ArrowForwardTwoToneIcon fontSize="small" />}
            onClick={headerOptions.onClickHandler}
          >
            {headerOptions.btnTitle}
          </Button>
        }
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map(header => (<Headers title={header} />))}
            </TableRow>
          </TableHead> 
          <TableBody>
            <TableRow hover>
              {children}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {hasPagination && (
        <CardActions
          disableSpacing
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Pagination count={itemsPerPage || 1} color="primary" />
        </CardActions>
      )}
    </Card>
  );
}