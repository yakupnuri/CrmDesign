import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Assignment as ProjectIcon,
  Visibility as ViewIcon,
  AttachMoney as PaymentIcon,
} from '@mui/icons-material';
import { useCurrency } from '../../context/CurrencyContext';

const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const { formatMoney } = useCurrency();

  useEffect(() => {
    fetchCustomerDetails();
  }, [id]);

  const fetchCustomerDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${id}`);
      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  useEffect(() => {
    if (customer) {
      fetchTransactions();
    }
  }, [customer]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`/api/customers/${customer.id}/transactions`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!customer) {
    return <Typography>Yükleniyor...</Typography>;
  }

  return (
    <Box p={3}>
      <Card elevation={0} sx={{ mb: 3, backgroundColor: 'primary.main', color: 'white' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {customer.name}
              </Typography>
              <Typography variant="subtitle1">
                {customer.company}
              </Typography>
            </Box>
            <Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate(`/projects/new?customerId=${customer.id}`)}
                sx={{ mr: 1, backgroundColor: 'white', color: 'primary.main' }}
              >
                Yeni Proje
              </Button>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/customers/${customer.id}/edit`)}
                sx={{ backgroundColor: 'white', color: 'primary.main' }}
              >
                Düzenle
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                İletişim Bilgileri
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Typography variant="body2" color="textSecondary" gutterBottom>
                E-posta
              </Typography>
              <Typography variant="body1" gutterBottom>
                {customer.email}
              </Typography>

              <Typography variant="body2" color="textSecondary" gutterBottom>
                Telefon
              </Typography>
              <Typography variant="body1" gutterBottom>
                {customer.phone}
              </Typography>

              <Typography variant="body2" color="textSecondary" gutterBottom>
                Adres
              </Typography>
              <Typography variant="body1">
                {customer.address.street}
                <br />
                {customer.address.city}, {customer.address.state}
                <br />
                {customer.address.zipCode}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Vergi Bilgileri
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="body2" color="textSecondary" gutterBottom>
                Vergi Numarası
              </Typography>
              <Typography variant="body1" gutterBottom>
                {customer.taxInfo.taxNumber}
              </Typography>

              <Typography variant="body2" color="textSecondary" gutterBottom>
                Vergi Dairesi
              </Typography>
              <Typography variant="body1" gutterBottom>
                {customer.taxInfo.taxOffice}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                KVK Durumu
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box display="flex" alignItems="center" mb={2}>
                <Chip
                  label={customer.kvkk.status ? "KVK Onaylandı" : "KVK Bekliyor"}
                  color={customer.kvkk.status ? "success" : "warning"}
                  sx={{ mr: 1 }}
                />
                {customer.kvkk.consentDate && (
                  <Typography variant="caption" color="textSecondary">
                    {new Date(customer.kvkk.consentDate).toLocaleDateString('tr-TR')}
                  </Typography>
                )}
              </Box>

              <Typography variant="body2" gutterBottom>
                <strong>Veri İşleme İzni:</strong> {customer.kvkk.dataUsageConsent ? 'Evet' : 'Hayır'}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Pazarlama İzni:</strong> {customer.kvkk.marketingConsent ? 'Evet' : 'Hayır'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cari Durum
              </Typography>
              <Grid container spacing={4}>
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    Toplam Borç
                  </Typography>
                  <Typography variant="h6" color="error">
                    {formatMoney(customer.total_debit)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    Toplam Alacak
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    {formatMoney(customer.total_credit)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" color="text.secondary">
                    Güncel Bakiye
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color={customer.balance > 0 ? 'error.main' : 'success.main'}
                  >
                    {formatMoney(customer.balance)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cari Hareketler
              </Typography>
              <TableContainer component={Paper} elevation={0}>
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
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Projeler
              </Typography>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Proje Adı</TableCell>
                      <TableCell>Başlangıç Tarihi</TableCell>
                      <TableCell>Durum</TableCell>
                      <TableCell>Toplam Tutar</TableCell>
                      <TableCell align="right">İşlemler</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customer.projects?.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>
                          {new Date(project.startDate).toLocaleDateString('tr-TR')}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={project.status}
                            color={project.status === 'completed' ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('tr-TR', {
                            style: 'currency',
                            currency: project.currency || 'TRY'
                          }).format(project.totalAmount)}
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Görüntüle">
                            <IconButton
                              size="small"
                              onClick={() => navigate(`/projects/${project.id}`)}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Düzenle">
                            <IconButton
                              size="small"
                              onClick={() => navigate(`/projects/${project.id}/edit`)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Ödeme Ekle">
                            <IconButton
                              size="small"
                              onClick={() => navigate(`/projects/${project.id}/payments/new`)}
                            >
                              <PaymentIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerDetail;
