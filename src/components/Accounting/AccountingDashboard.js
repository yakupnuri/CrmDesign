import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Tab,
  Tabs,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TransactionList from './TransactionList';
import TransactionForm from './TransactionForm';
import InvoiceList from './InvoiceList';
import CategoryList from './CategoryList';
import CustomerAccountList from './CustomerAccount/CustomerAccountList';
import { useCurrency } from '../../context/CurrencyContext';

const AccountingDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const { formatMoney } = useCurrency();

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    unpaidInvoices: 0,
    overdueInvoices: 0
  });

  useEffect(() => {
    // Burada API'den verileri çekeceğiz
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // API çağrıları eklenecek
      // const transactionsData = await getTransactions();
      // const invoicesData = await getInvoices();
      // setTransactions(transactionsData);
      // setInvoices(invoicesData);
    } catch (error) {
      console.error('Error loading accounting data:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddTransaction = () => {
    setShowTransactionForm(true);
  };

  const handleCreateInvoice = () => {
    // Navigate to invoice creation page
  };

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {/* Özet Kartları */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Toplam Gelir
              </Typography>
              <Typography variant="h4" color="success.main">
                {formatMoney(summary.totalIncome)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Toplam Gider
              </Typography>
              <Typography variant="h4" color="error.main">
                {formatMoney(summary.totalExpense)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bakiye
              </Typography>
              <Typography variant="h4" color={summary.balance >= 0 ? 'success.main' : 'error.main'}>
                {formatMoney(summary.balance)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Ana İçerik */}
        <Grid item xs={12}>
          <Paper>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="İşlemler" icon={<AccountBalanceIcon />} iconPosition="start" />
                <Tab label="Faturalar" icon={<ReceiptIcon />} iconPosition="start" />
                <Tab label="Müşteri Carileri" />
                <Tab label="Kategoriler" />
              </Tabs>
            </Box>

            {/* İşlem Ekleme ve Fatura Oluşturma Butonları */}
            <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
              {activeTab === 0 ? (
                <>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddTransaction}
                  >
                    Yeni İşlem Ekle
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setShowCategoryList(true)}
                  >
                    Kategoriler
                  </Button>
                </>
              ) : activeTab === 1 ? (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleCreateInvoice}
                >
                  Yeni Fatura Oluştur
                </Button>
              ) : activeTab === 2 ? (
                <></>
              ) : (
                <></>
              )}
            </Box>

            {/* İşlemler veya Faturalar Listesi */}
            <Box sx={{ p: 2 }}>
              {activeTab === 0 ? (
                <TransactionList transactions={transactions} />
              ) : activeTab === 1 ? (
                <InvoiceList invoices={invoices} />
              ) : activeTab === 2 ? (
                <CustomerAccountList />
              ) : (
                <CategoryList />
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* İşlem Ekleme Formu Modal */}
      {showTransactionForm && (
        <TransactionForm
          open={showTransactionForm}
          onClose={() => setShowTransactionForm(false)}
          onSubmit={(data) => {
            console.log('New transaction:', data);
            setShowTransactionForm(false);
          }}
        />
      )}

      {/* Kategori Listesi Modal */}
      {showCategoryList && (
        <CategoryList
          open={showCategoryList}
          onClose={() => setShowCategoryList(false)}
        />
      )}
    </Box>
  );
};

export default AccountingDashboard;
