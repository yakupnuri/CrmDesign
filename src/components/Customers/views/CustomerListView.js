import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import CustomerCard from '../components/CustomerCard';
import DeleteConfirmDialog from '../../common/DeleteConfirmDialog';
import useCustomers from '../hooks/useCustomers';

const CustomerListView = () => {
  const navigate = useNavigate();
  const { customers, loading, error, deleteCustomer } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, customer: null });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (deleteDialog.customer) {
      const result = await deleteCustomer(deleteDialog.customer.id);
      if (result.success) {
        setDeleteDialog({ open: false, customer: null });
      } else {
        // Hata durumunda da dialogu kapatalım ama kullanıcıya bilgi verelim
        setDeleteDialog({ open: false, customer: null });
        alert(result.error);
      }
    }
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

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Müşteriler
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/customers/new')}
        >
          Yeni Müşteri
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Müşteri Ara..."
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {filteredCustomers.map((customer) => (
          <Grid item xs={12} sm={6} md={4} key={customer.id}>
            <CustomerCard
              customer={customer}
              onView={() => navigate(`/customers/${customer.id}`)}
              onEdit={() => navigate(`/customers/${customer.id}/edit`)}
              onDelete={() => setDeleteDialog({ open: true, customer })}
            />
          </Grid>
        ))}
      </Grid>

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, customer: null })}
        onConfirm={handleDelete}
        title="Müşteriyi Sil"
        content="Bu müşteriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
      />
    </Box>
  );
};

export default CustomerListView;
