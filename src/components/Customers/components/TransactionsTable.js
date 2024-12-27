import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';
import { useCurrency } from '../../../context/CurrencyContext';

const TransactionsTable = ({ transactions }) => {
  const { formatMoney } = useCurrency();

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tarih</TableCell>
            <TableCell>Açıklama</TableCell>
            <TableCell>İlişkili Kayıt</TableCell>
            <TableCell>Tür</TableCell>
            <TableCell align="right">Tutar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>
                {new Date(transaction.transaction_date).toLocaleDateString('tr-TR')}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                {transaction.project_name && `Proje: ${transaction.project_name}`}
                {transaction.invoice_number && `Fatura: ${transaction.invoice_number}`}
              </TableCell>
              <TableCell>
                <Chip
                  label={transaction.transaction_type === 'debit' ? 'Borç' : 'Alacak'}
                  color={transaction.transaction_type === 'debit' ? 'error' : 'success'}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                {formatMoney(transaction.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
