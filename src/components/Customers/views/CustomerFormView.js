import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import CustomerForm from '../components/CustomerForm';
import useCustomers from '../hooks/useCustomers';
import { API_BASE_URL } from '../../../config/constants';

const CustomerFormView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addCustomer, updateCustomer } = useCustomers();
  const [loading, setLoading] = useState(id ? true : false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    tax_office: '',
    tax_number: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCustomer = async () => {
      if (id) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/customers/${id}`);
          if (!response.ok) {
            throw new Error('Müşteri bilgileri yüklenirken bir hata oluştu');
          }
          const data = await response.json();
          setFormData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCustomer();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Müşteri adı gereklidir';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    if (formData.phone && !/^\+?[\d\s-]+$/.test(formData.phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const result = id
        ? await updateCustomer(id, formData)
        : await addCustomer(formData);

      if (result.success) {
        navigate('/customers');
      } else {
        setError(result.error);
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

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/customers')}
        >
          Geri
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {id ? 'Müşteri Düzenle' : 'Yeni Müşteri'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <CustomerForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isEdit={!!id}
        />
      </Paper>
    </Box>
  );
};

export default CustomerFormView;
