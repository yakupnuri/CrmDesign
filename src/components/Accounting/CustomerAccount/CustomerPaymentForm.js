import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useCurrency } from '../../../context/CurrencyContext';

const PAYMENT_METHODS = [
  { value: 'cash', label: 'Nakit' },
  { value: 'bank_transfer', label: 'Banka Transferi' },
  { value: 'credit_card', label: 'Kredi Kartı' },
  { value: 'check', label: 'Çek' },
];

const CustomerPaymentForm = ({ open, onClose, onSubmit, account }) => {
  const [formData, setFormData] = useState({
    amount: '',
    payment_date: new Date(),
    payment_method: 'cash',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const { formatMoney } = useCurrency();

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

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      payment_date: date
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Geçerli bir tutar giriniz';
    }
    if (formData.amount > account.balance) {
      newErrors.amount = 'Ödeme tutarı bakiyeden büyük olamaz';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        customer_account_id: account.id,
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Ödeme Al - {account.customer_name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mevcut Bakiye"
              value={formatMoney(account.balance)}
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ödeme Tutarı"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              error={!!errors.amount}
              helperText={errors.amount}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <DatePicker
              label="Ödeme Tarihi"
              value={formData.payment_date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Ödeme Yöntemi</InputLabel>
              <Select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                label="Ödeme Yöntemi"
              >
                {PAYMENT_METHODS.map(method => (
                  <MenuItem key={method.value} value={method.value}>
                    {method.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Açıklama"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={2}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Ödeme Al
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerPaymentForm;
