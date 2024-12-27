import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { useCurrency } from '../../context/CurrencyContext';

const TransactionList = ({ transactions }) => {
  const { formatMoney } = useCurrency();

  const getTypeColor = (type) => {
    return type === 'income' ? 'success' : 'error';
  };

  const getTypeLabel = (type) => {
    return type === 'income' ? 'Gelir' : 'Gider';
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tarih</TableCell>
            <TableCell>Tip</TableCell>
            <TableCell>Açıklama</TableCell>
            <TableCell>Kategori</TableCell>
            <TableCell align="right">Tutar</TableCell>
            <TableCell align="right">KDV</TableCell>
            <TableCell>Ödeme Yöntemi</TableCell>
            <TableCell align="center">İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {format(new Date(transaction.transaction_date), 'dd MMM yyyy', { locale: nl })}
              </TableCell>
              <TableCell>
                <Chip
                  label={getTypeLabel(transaction.type)}
                  color={getTypeColor(transaction.type)}
                  size="small"
                />
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell align="right">
                {formatMoney(transaction.amount)}
              </TableCell>
              <TableCell align="right">
                {transaction.tax_rate}%
              </TableCell>
              <TableCell>{transaction.payment_method}</TableCell>
              <TableCell align="center">
                <IconButton size="small" color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionList;
