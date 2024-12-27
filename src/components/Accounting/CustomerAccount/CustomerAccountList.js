import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PaymentIcon from '@mui/icons-material/Payment';
import { useCurrency } from '../../../context/CurrencyContext';
import CustomerPaymentForm from './CustomerPaymentForm';
import CustomerAccountDetail from './CustomerAccountDetail';

const CustomerAccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showAccountDetail, setShowAccountDetail] = useState(false);
  const { formatMoney } = useCurrency();

  useEffect(() => {
    // API'den müşteri cari hesaplarını çek
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      // API çağrısı yapılacak
      const response = await fetch('/api/customer-accounts');
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const handlePayment = (account) => {
    setSelectedAccount(account);
    setShowPaymentForm(true);
  };

  const handleViewDetail = (account) => {
    setSelectedAccount(account);
    setShowAccountDetail(true);
  };

  const handlePaymentSubmit = async (paymentData) => {
    try {
      // API çağrısı yapılacak
      await fetch('/api/customer-payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      
      setShowPaymentForm(false);
      fetchAccounts(); // Listeyi güncelle
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Müşteri Cari Hesapları</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Müşteri</TableCell>
              <TableCell align="right">Toplam Borç</TableCell>
              <TableCell align="right">Toplam Alacak</TableCell>
              <TableCell align="right">Bakiye</TableCell>
              <TableCell align="right">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.customer_name}</TableCell>
                <TableCell align="right">{formatMoney(account.total_debit)}</TableCell>
                <TableCell align="right">{formatMoney(account.total_credit)}</TableCell>
                <TableCell 
                  align="right"
                  sx={{ 
                    color: account.balance > 0 ? 'error.main' : 'success.main',
                    fontWeight: 'bold'
                  }}
                >
                  {formatMoney(account.balance)}
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    size="small" 
                    onClick={() => handleViewDetail(account)}
                    title="Detaylar"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handlePayment(account)}
                    title="Ödeme Al"
                    color="primary"
                  >
                    <PaymentIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showPaymentForm && (
        <CustomerPaymentForm
          open={showPaymentForm}
          onClose={() => setShowPaymentForm(false)}
          onSubmit={handlePaymentSubmit}
          account={selectedAccount}
        />
      )}

      {showAccountDetail && (
        <CustomerAccountDetail
          open={showAccountDetail}
          onClose={() => setShowAccountDetail(false)}
          account={selectedAccount}
        />
      )}
    </Box>
  );
};

export default CustomerAccountList;
