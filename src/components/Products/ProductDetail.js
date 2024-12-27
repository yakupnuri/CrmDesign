import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit as EditIcon } from '@mui/icons-material';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);

  useEffect(() => {
    fetchProduct();
    fetchRelatedProjects();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const fetchRelatedProjects = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}/projects`);
      const data = await response.json();
      setRelatedProjects(data);
    } catch (error) {
      console.error('Error fetching related projects:', error);
    }
  };

  if (!product) {
    return null;
  }

  const getStatusColor = (status) => {
    const statusColors = {
      active: 'success',
      inactive: 'error',
      limited: 'warning'
    };
    return statusColors[status] || 'default';
  };

  return (
    <Box p={3}>
      <Card elevation={0} sx={{ mb: 3, backgroundColor: 'primary.main', color: 'white' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {product.name}
            </Typography>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => navigate(`/products/${id}/edit`)}
              sx={{ backgroundColor: 'white', color: 'primary.main' }}
            >
              Düzenle
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Temel Bilgiler
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Ürün Kodu
                  </Typography>
                  <Typography variant="body1">
                    {product.code}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Tür
                  </Typography>
                  <Chip
                    label={product.type === 'product' ? 'Ürün' : 'Hizmet'}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Açıklama
                  </Typography>
                  <Typography variant="body1">
                    {product.description}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Fiyat Bilgileri
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Fiyat
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: 'TRY'
                    }).format(product.price)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    KDV Oranı
                  </Typography>
                  <Typography variant="body1">
                    %{product.taxRate}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Durum
                  </Typography>
                  <Chip
                    label={product.status}
                    color={getStatusColor(product.status)}
                    size="small"
                  />
                </Grid>
              </Grid>

              {product.image && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" gutterBottom>
                    Görsel
                  </Typography>
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: '100%',
                      maxHeight: 400,
                      objectFit: 'contain',
                      borderRadius: 1,
                    }}
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                İlişkili Projeler
              </Typography>
              {relatedProjects.length > 0 ? (
                <TableContainer component={Paper} elevation={0}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Proje</TableCell>
                        <TableCell align="right">Tutar</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {relatedProjects.map((project) => (
                        <TableRow
                          key={project.id}
                          hover
                          onClick={() => navigate(`/projects/${project.id}`)}
                          sx={{ cursor: 'pointer' }}
                        >
                          <TableCell>{project.name}</TableCell>
                          <TableCell align="right">
                            {new Intl.NumberFormat('tr-TR', {
                              style: 'currency',
                              currency: 'TRY'
                            }).format(project.amount)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Bu ürün/hizmet henüz hiçbir projede kullanılmamış.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;
