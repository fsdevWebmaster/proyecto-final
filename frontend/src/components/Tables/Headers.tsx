import React from 'react';
import { Generic } from './types';
import { TableCell } from '@mui/material';

interface IHeadersProps {
  title: string;
}

export const Headers = ({title}: IHeadersProps) => {
  return (
    <TableCell align='center'>{title}</TableCell>
  )
};