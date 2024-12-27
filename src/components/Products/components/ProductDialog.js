import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { CategoryService } from '../../../services/categoryService';
import { createProduct } from '../../../services/productService';

const ProductDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: 'info', message: '' });

  useEffect(() => {
    if (open) {
      loadCategories();
    }
  }, [open]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await CategoryService.getAllCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      showAlert('error', 'Kategoriler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: 'info', message: '' }), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createProduct(formData);
      showAlert('success', 'Ürün başarıyla eklendi');
      setFormData({
        name: '',
        description: '',
        price: '',
        category_id: ''
      });
    } catch (error) {
      showAlert('error', 'Ürün eklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category_id: ''
    });
    setAlert({ show: false, type: 'info', message: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Yeni Ürün Ekle</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {alert.show && (
            <Alert 
              severity={alert.type} 
              sx={{ mb: 2 }}
              onClose={() => setAlert({ show: false, type: 'info', message: '' })}
            >
              {alert.message}
            </Alert>
          )}

          <TextField
            name="name"
            label="Ürün Adı"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            disabled={loading}
          />

          <TextField
            name="description"
            label="Açıklama"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
            disabled={loading}
          />

          <TextField
            name="price"
            label="Fiyat"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            disabled={loading}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Kategori</InputLabel>
            <Select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              disabled={loading}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            İptal
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={loading}
          >
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductDialog;
