import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import ProductCard from './components/ProductCard';
import ProductHeader from './components/ProductHeader';
import { getAllProducts } from '../../services/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  return (
    <Box p={3}>
      <ProductHeader onProductAdded={handleProductAdded} />
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
