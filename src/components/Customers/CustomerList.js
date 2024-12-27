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
  IconButton,
  Button,
  Typography,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';
import CustomerDetail from './CustomerDetail';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();
  const { formatMoney } = useCurrency();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleEdit = (customer) => {
    navigate(`/customers/${customer.id}/edit`);
  };

  const handleDelete = async () => {
    if (!selectedCustomer) return;

    try {
      const response = await fetch(`/api/customers/${selectedCustomer.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
        setShowDeleteDialog(false);
        setSelectedCustomer(null);
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleViewDetail = (customer) => {
    setSelectedCustomer(customer);
    setShowDetail(true);
  };

  const confirmDelete = (customer) => {
    setSelectedCustomer(customer);
    setShowDeleteDialog(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Müşteriler</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/customers/new')}
        >
          Yeni Müşteri
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Müşteri Adı</TableCell>
              <TableCell>E-posta</TableCell>
              <TableCell>Telefon</TableCell>
              <TableCell align="right">Bakiye</TableCell>
              <TableCell align="right">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell align="right">
                  <Typography
                    sx={{
                      color: customer.balance > 0 ? 'error.main' : 'success.main',
                      fontWeight: 'bold'
                    }}
                  >
                    {formatMoney(customer.balance)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => handleViewDetail(customer)}
                    title="Detaylar"
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(customer)}
                    title="Düzenle"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => confirmDelete(customer)}
                    title="Sil"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showDetail && selectedCustomer && (
        <CustomerDetail
          open={showDetail}
          onClose={() => setShowDetail(false)}
          customer={selectedCustomer}
        />
      )}

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Müşteriyi Sil"
        content="Bu müşteriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve müşteriye ait tüm veriler silinecektir."
      />
    </Box>
  );
};

export default CustomerList;
