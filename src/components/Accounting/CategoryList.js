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
  Tabs,
  Tab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryForm from './CategoryForm';

const CategoryList = ({ open, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [activeTab, setActiveTab] = useState('income');

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

  const filteredCategories = categories.filter(
    category => category.type === activeTab
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Kategoriler</DialogTitle>
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
          >
            <Tab label="Gelir Kategorileri" value="income" />
            <Tab label="Gider Kategorileri" value="expense" />
          </Tabs>
        </Box>

        <Box sx={{ mb: 2 }}>
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
                <TableCell>Durum</TableCell>
                <TableCell align="right">İşlemler</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
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
          <CategoryForm
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

export default CategoryList;
