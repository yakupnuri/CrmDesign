import React from 'react';
import {
  Card,
  CardContent,
  TextField,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ProductSearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <TextField
          fullWidth
          placeholder="Ürün/Hizmet Ara..."
          value={searchTerm}
          onChange={onSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ProductSearchBar;
