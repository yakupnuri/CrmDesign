import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const CustomerSearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <Box mb={3}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Müşteri Ara (İsim, E-posta veya Telefon)"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default CustomerSearchBar;
