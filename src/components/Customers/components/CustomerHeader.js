import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CustomerHeader = () => {
  const navigate = useNavigate();

  return (
    <Card elevation={0} sx={{ mb: 3, backgroundColor: 'primary.main', color: 'white' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Müşteri Yönetimi
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/customers/new')}
            sx={{ backgroundColor: 'white', color: 'primary.main' }}
          >
            Yeni Müşteri
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomerHeader;
