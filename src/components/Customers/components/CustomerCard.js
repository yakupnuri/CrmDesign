import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useCurrency } from '../../../context/CurrencyContext';

const CustomerCard = ({ customer, onEdit, onDelete, onView }) => {
  const { formatMoney } = useCurrency();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="div">
            {customer.name}
          </Typography>
          <Box>
            <Tooltip title="Görüntüle">
              <IconButton size="small" onClick={() => onView(customer)}>
                <ViewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Düzenle">
              <IconButton size="small" onClick={() => onEdit(customer)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sil">
              <IconButton size="small" onClick={() => onDelete(customer)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography color="text.secondary" gutterBottom>
          {customer.email}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {customer.phone}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Bakiye
          </Typography>
          <Typography 
            variant="h6" 
            color={customer.balance > 0 ? 'error.main' : 'success.main'}
          >
            {formatMoney(customer.balance)}
          </Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Chip
            label={customer.status || 'Aktif'}
            color={customer.status === 'Pasif' ? 'default' : 'success'}
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
