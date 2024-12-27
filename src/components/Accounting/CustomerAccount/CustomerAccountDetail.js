import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import { useCurrency } from '../../../context/CurrencyContext';

const CustomerAccountDetail = ({ open, onClose, account }) => {
  const [transactions, setTransactions] = useState([]);
  const { formatMoney } = useCurrency();

  useEffect(() => {
    if (account) {
      fetchTransactions();
    }
  }, [account]);

  const fetchTransactions = async () => {
    try {
      // API çağrısı yapılacak
      const response = await fetch(`/api/customer-accounts/${account.id}/transactions`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const getTransactionTypeChip = (type) => {
    switch (type) {
      case 'debit':
        return <Chip label="Borç" color="error" size="small" />;
      case 'credit':
        return <Chip label="Alacak" color="success" size="small" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Cari Hesap Detayı - {account.customer_name}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Özet Bilgiler
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Toplam Borç
              </Typography>
              <Typography variant="h6" color="error">
                {formatMoney(account.total_debit)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Toplam Alacak
              </Typography>
              <Typography variant="h6" color="success.main">
                {formatMoney(account.total_credit)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Güncel Bakiye
              </Typography>
              <Typography 
                variant="h6" 
                color={account.balance > 0 ? 'error.main' : 'success.main'}
              >
                {formatMoney(account.balance)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          Hesap Hareketleri
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tarih</TableCell>
                <TableCell>Açıklama</TableCell>
                <TableCell>Tür</TableCell>
                <TableCell align="right">Tutar</TableCell>
                <TableCell align="right">Bakiye</TableCell>
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
                    {getTransactionTypeChip(transaction.transaction_type)}
                  </TableCell>
                  <TableCell align="right">
                    {formatMoney(transaction.amount)}
                  </TableCell>
                  <TableCell 
                    align="right"
                    sx={{ 
                      color: transaction.running_balance > 0 ? 'error.main' : 'success.main',
                      fontWeight: 'bold'
                    }}
                  >
                    {formatMoney(transaction.running_balance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerAccountDetail;
