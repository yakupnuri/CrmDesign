import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { ChromePicker } from 'react-color';

const IncomeCategoryForm = ({ open, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    color: '#4CAF50',
    is_active: true
  });

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'is_active' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleColorChange = (color) => {
    setFormData(prev => ({
      ...prev,
      color: color.hex
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Kategori adı gereklidir';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? 'Gelir Kategorisi Düzenle' : 'Yeni Gelir Kategorisi'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Kategori Adı"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
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

          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={() => setShowColorPicker(!showColorPicker)}
              style={{
                backgroundColor: formData.color,
                color: '#fff',
                marginBottom: showColorPicker ? '10px' : '0'
              }}
            >
              Renk Seç
            </Button>
            {showColorPicker && (
              <div style={{ position: 'absolute', zIndex: 2 }}>
                <ChromePicker
                  color={formData.color}
                  onChange={handleColorChange}
                />
              </div>
            )}
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_active}
                  onChange={handleChange}
                  name="is_active"
                  color="primary"
                />
              }
              label="Aktif"
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

export default IncomeCategoryForm;
