import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormHelperText,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import nlLocale from 'date-fns/locale/nl';

const TransactionForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    description: '',
    category: '',
    transaction_date: new Date(),
    payment_method: '',
    tax_rate: 21,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      transaction_date: date
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.amount) newErrors.amount = 'Tutar gereklidir';
    if (!formData.description) newErrors.description = 'Açıklama gereklidir';
    if (!formData.category) newErrors.category = 'Kategori gereklidir';
    if (!formData.payment_method) newErrors.payment_method = 'Ödeme yöntemi gereklidir';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {formData.type === 'income' ? 'Yeni Gelir Ekle' : 'Yeni Gider Ekle'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>İşlem Tipi</InputLabel>
              <Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                label="İşlem Tipi"
              >
                <MenuItem value="income">Gelir</MenuItem>
                <MenuItem value="expense">Gider</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Tutar"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              error={!!errors.amount}
              helperText={errors.amount}
              InputProps={{
                startAdornment: '€',
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Açıklama"
              name="description"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Kategori"
              name="category"
              value={formData.category}
              onChange={handleChange}
              error={!!errors.category}
              helperText={errors.category}
            />
          </Grid>

          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={nlLocale}>
              <DatePicker
                label="İşlem Tarihi"
                value={formData.transaction_date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.payment_method}>
              <InputLabel>Ödeme Yöntemi</InputLabel>
              <Select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                label="Ödeme Yöntemi"
              >
                <MenuItem value="bank">Banka Transferi</MenuItem>
                <MenuItem value="cash">Nakit</MenuItem>
                <MenuItem value="card">Kredi Kartı</MenuItem>
              </Select>
              {errors.payment_method && (
                <FormHelperText>{errors.payment_method}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="KDV Oranı (%)"
              name="tax_rate"
              type="number"
              value={formData.tax_rate}
              onChange={handleChange}
              InputProps={{
                endAdornment: '%',
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İptal</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Kaydet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransactionForm;
