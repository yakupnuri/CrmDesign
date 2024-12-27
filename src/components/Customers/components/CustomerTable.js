import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import CustomerTableRow from './CustomerTableRow';

const CustomerTable = ({ customers }) => {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Müşteri Adı</TableCell>
            <TableCell>İletişim Bilgileri</TableCell>
            <TableCell>Aktif Projeler</TableCell>
            <TableCell>KVK Durumu</TableCell>
            <TableCell>Son İşlem</TableCell>
            <TableCell align="right">İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <CustomerTableRow key={customer.id} customer={customer} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
