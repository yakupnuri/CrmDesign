import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import CategoryDialog from './CategoryDialog';

const ProductHeader = ({ onProductAdded }) => {
  const navigate = useNavigate();
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);

  return (
    <Card elevation={0} sx={{ mb: 3, backgroundColor: 'primary.main', color: 'white' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Ürün ve Hizmet Yönetimi
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<CategoryIcon />}
              onClick={() => setCategoryDialogOpen(true)}
              sx={{ backgroundColor: 'white', color: 'primary.main' }}
            >
              Kategori Ekle
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/products/new')}
              sx={{ backgroundColor: 'white', color: 'primary.main' }}
            >
              Yeni Ürün/Hizmet
            </Button>
          </Stack>
        </Box>
      </CardContent>

      <CategoryDialog
        open={categoryDialogOpen}
        onClose={() => setCategoryDialogOpen(false)}
      />
    </Card>
  );
};

export default ProductHeader;
