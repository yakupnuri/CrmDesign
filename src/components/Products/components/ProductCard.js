import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatCurrency } from '../../../utils/formatters';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'limited': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fiyat: {formatCurrency(product.price, product.currency)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Kategori: {product.category_name || 'Kategorisiz'}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            color="primary"
            onClick={() => onEdit(product)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => onDelete(product)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="primary">
            {formatCurrency(product.price, product.currency)}
          </Typography>
          <Box>
            <Chip
              label={product.type === 'product' ? 'Ürün' : 'Hizmet'}
              size="small"
              sx={{ mr: 1 }}
            />
            <Chip
              label={product.status}
              color={getStatusColor(product.status)}
              size="small"
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
