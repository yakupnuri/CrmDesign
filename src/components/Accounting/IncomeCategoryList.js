import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IncomeCategoryForm from './IncomeCategoryForm';

const IncomeCategoryList = ({ open, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingCategory) {
        // API çağrısı: kategori güncelleme
        console.log('Update category:', formData);
      } else {
        // API çağrısı: yeni kategori ekleme
        console.log('Add new category:', formData);
      }
      setShowForm(false);
      // Kategorileri yeniden yükle
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Gelir Kategorileri</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2, mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddCategory}
          >
            Yeni Kategori
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Kategori Adı</TableCell>
                <TableCell>Açıklama</TableCell>
                <TableCell>Renk</TableCell>
                <TableCell>Durum</TableCell>
                <TableCell align="right">İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        backgroundColor: category.color,
                        borderRadius: '50%'
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={category.is_active ? 'Aktif' : 'Pasif'}
                      color={category.is_active ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleEditCategory(category)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {showForm && (
          <IncomeCategoryForm
            open={showForm}
            onClose={() => setShowForm(false)}
            onSubmit={handleSubmit}
            initialData={editingCategory}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default IncomeCategoryList;
