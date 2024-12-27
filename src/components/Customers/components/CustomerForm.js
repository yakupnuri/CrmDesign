import React from 'react';
import {
  Grid,
  TextField,
  Box,
  Button,
} from '@mui/material';

const CustomerForm = ({ formData, errors, handleChange, handleSubmit, isEdit = false }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Müşteri Adı"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="E-posta"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Telefon"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Adres"
            name="address"
            value={formData.address}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vergi Dairesi"
            name="tax_office"
            value={formData.tax_office}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vergi Numarası"
            name="tax_number"
            value={formData.tax_number}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          {isEdit ? 'Güncelle' : 'Kaydet'}
        </Button>
      </Box>
    </form>
  );
};

export default CustomerForm;
