import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Typography,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const ProductTable = ({ products }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  const getTypeLabel = (type) => {
    return type === 'product' ? 'Ürün' : 'Hizmet';
  };

  const getTypeColor = (type) => {
    return type === 'product' ? 'primary' : 'secondary';
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'error';
  };

  const getStatusLabel = (status) => {
    return status === 'active' ? 'Aktif' : 'Pasif';
  };

  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ürün/Hizmet Adı</TableCell>
            <TableCell>Kategori</TableCell>
            <TableCell>Tür</TableCell>
            <TableCell align="right">Fiyat</TableCell>
            <TableCell align="right">KDV</TableCell>
            <TableCell>Durum</TableCell>
            <TableCell align="right">İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow 
              key={product.id}
              sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
            >
              <TableCell>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {product.name}
                </Typography>
                {product.code && (
                  <Typography variant="caption" color="textSecondary">
                    {product.code}
                  </Typography>
                )}
              </TableCell>
              <TableCell>{product.category?.name}</TableCell>
              <TableCell>
                <Chip
                  label={getTypeLabel(product.type)}
                  color={getTypeColor(product.type)}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">{formatPrice(product.price)}</TableCell>
              <TableCell align="right">%{product.tax_rate}</TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(product.status)}
                  color={getStatusColor(product.status)}
                  size="small"
                />
              </TableCell>
              <TableCell align="right">
                <Tooltip title="Düzenle">
                  <IconButton size="small">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sil">
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
