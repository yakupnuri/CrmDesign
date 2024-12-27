import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Tabs,
  Tab,
  Button,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { API_BASE_URL } from '../../../config/constants';
import { useCurrency } from '../../../context/CurrencyContext';
import TransactionsTable from '../components/TransactionsTable';

const CustomerDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { formatMoney } = useCurrency();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/customers/${id}`);
        if (!response.ok) {
          throw new Error('Müşteri bilgileri yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        setCustomer(data);
        
        // Müşteri işlemlerini yükle
        const transactionsResponse = await fetch(`${API_BASE_URL}/api/customers/${id}/transactions`);
        if (transactionsResponse.ok) {
          const transactionsData = await transactionsResponse.json();
          setTransactions(transactionsData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!customer) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="warning">Müşteri bulunamadı</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/customers')}
        >
          Geri
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate(`/customers/${id}/edit`)}
        >
          Düzenle
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Müşteri Bilgileri
              </Typography>
              <Typography variant="body1">{customer.name}</Typography>
              <Typography color="text.secondary">{customer.email}</Typography>
              <Typography color="text.secondary">{customer.phone}</Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>{customer.address}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Vergi Bilgileri
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vergi Dairesi
              </Typography>
              <Typography variant="body1" gutterBottom>
                {customer.tax_office}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Vergi No
              </Typography>
              <Typography variant="body1">
                {customer.tax_number}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cari Durum
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Toplam Borç
                </Typography>
                <Typography variant="h6" color="error">
                  {formatMoney(customer.total_debit)}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Toplam Alacak
                </Typography>
                <Typography variant="h6" color="success.main">
                  {formatMoney(customer.total_credit)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Bakiye
                </Typography>
                <Typography 
                  variant="h6" 
                  color={customer.balance > 0 ? 'error.main' : 'success.main'}
                >
                  {formatMoney(customer.balance)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="İşlem Geçmişi" />
                <Tab label="Projeler" />
                <Tab label="Faturalar" />
              </Tabs>

              <Box sx={{ mt: 2 }}>
                {activeTab === 0 && (
                  <TransactionsTable transactions={transactions} />
                )}
                {activeTab === 1 && (
                  <Typography>Projeler burada listelenecek</Typography>
                )}
                {activeTab === 2 && (
                  <Typography>Faturalar burada listelenecek</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerDetailView;
