import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Alert,
  CircularProgress,
  Typography
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { CategoryService } from '../../../services/categoryService';

const CategoryDialog = ({ open, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: 'info', message: '' });
  const [dbStatus, setDbStatus] = useState('Bağlantı kontrol ediliyor...');

  useEffect(() => {
    if (open) {
      checkDbConnection();
      loadCategories();
    }
  }, [open]);

  const checkDbConnection = async () => {
    try {
      const data = await CategoryService.getAllCategories();
      if (Array.isArray(data)) {
        setDbStatus('Veritabanına bağlı: categories tablosu');
      } else {
        setDbStatus('Veritabanı bağlantısı başarısız');
      }
    } catch (error) {
      setDbStatus('Veritabanı bağlantısı başarısız');
    }
  };

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
    setTimeout(() => setAlert({ show: false, type: 'info', message: '' }), 3000);
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
      if (editingId) {
        await CategoryService.updateCategory(editingId, formData);
        showAlert('success', 'Kategori başarıyla güncellendi');
      } else {
        await CategoryService.createCategory(formData);
        showAlert('success', 'Kategori başarıyla eklendi');
      }

      setFormData({ name: '', description: '' });
      setEditingId(null);
      loadCategories();
    } catch (error) {
      showAlert('error', error.response?.data?.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description || ''
    });
    setEditingId(category.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
      return;
    }

    setLoading(true);
    try {
      await CategoryService.deleteCategory(id);
      showAlert('success', 'Kategori başarıyla silindi');
      loadCategories();
    } catch (error) {
      showAlert('error', 'Kategori silinirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '' });
    setEditingId(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
      <DialogTitle>
        {editingId ? 'Kategori Düzenle' : 'Yeni Kategori Ekle'}
      </DialogTitle>
      
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

          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            {dbStatus}
          </Typography>

          <TextField
            name="name"
            label="Kategori Adı"
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
            rows={2}
            margin="normal"
            disabled={loading}
          />

          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Kategori Adı</TableCell>
                  <TableCell>Açıklama</TableCell>
                  <TableCell align="right">İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : categories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      Henüz kategori bulunmuyor
                    </TableCell>
                  </TableRow>
                ) : (
                  categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() => handleEdit(category)}
                          disabled={loading}
                          size="small"
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(category.id)}
                          disabled={loading}
                          size="small"
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel} disabled={loading}>
            İptal
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Kaydediliyor...' : editingId ? 'Güncelle' : 'Kaydet'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoryDialog;
