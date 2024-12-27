import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Alert,
  CircularProgress,
  IconButton,
  Paper
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { createProduct } from '../../services/productService';
import { CategoryService } from '../../services/categoryService';

const Input = styled('input')({
  display: 'none',
});

const ProductImage = styled('img')({
  width: '100%',
  maxHeight: '200px',
  objectFit: 'contain',
  marginBottom: '1rem',
});

const ErrorBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.contrastText,
}));

const generateProductCode = () => {
  const prefix = 'PRD';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};

const NewProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryError, setCategoryError] = useState('');
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    type: 'product',
    code: generateProductCode(),
    tax_rate: 21,
    status: 'active'
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: 'info', message: '' });
  const [errorDetails, setErrorDetails] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const data = await CategoryService.getAllCategories();
        if (!Array.isArray(data) || data.length === 0) {
          setErrorDetails('Henüz hiç kategori eklenmemiş. Lütfen önce bir kategori ekleyin.');
          return;
        }
        setCategories(data);
        setCategoryError('');
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
        setCategoryError('Kategoriler yüklenemedi. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Resim sıkıştırma fonksiyonu
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Maksimum boyutlar
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 600;

          // En boy oranını koru
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Resmi sıkıştırılmış formatta al
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedDataUrl);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          setErrorDetails('Resim boyutu 10MB\'dan küçük olmalıdır');
          return;
        }

        // Resmi sıkıştır
        const compressedImage = await compressImage(file);
        
        setPreviewImage(compressedImage);
        setFormData(prev => ({
          ...prev,
          image_url: compressedImage
        }));
      } catch (error) {
        setErrorDetails('Resim yüklenirken hata oluştu: ' + error.message);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (!formData.name) {
      setErrorDetails('Ürün adı zorunludur');
      isValid = false;
    }
    if (!formData.price) {
      setErrorDetails('Fiyat zorunludur');
      isValid = false;
    }
    if (!formData.category_id) {
      setErrorDetails('Kategori seçimi zorunludur');
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorDetails('');
    
    if (!validateForm()) {
      setErrorDetails('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    try {
      setLoading(true);
      
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        category_id: parseInt(formData.category_id, 10),
        tax_rate: parseFloat(formData.tax_rate)
      };
      
      console.log('Gönderilen ürün verisi:', productData);
      
      const response = await createProduct(productData);
      
      setAlert({
        show: true,
        type: 'success',
        message: 'Ürün başarıyla oluşturuldu!'
      });
      
      setTimeout(() => {
        navigate('/products');
      }, 1500);
    } catch (error) {
      console.error('Ürün oluşturma hatası:', error);
      setErrorDetails(
        'Ürün oluşturulurken hata oluştu: ' + 
        (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Yeni Ürün Ekle
        </Typography>
        
        {errorDetails && (
          <ErrorBox>
            <Typography variant="body1" component="pre" style={{ whiteSpace: 'pre-wrap' }}>
              {errorDetails}
            </Typography>
          </ErrorBox>
        )}

        {alert.show && (
          <Alert severity={alert.type} sx={{ mb: 2 }}>
            {alert.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Ürün Resmi */}
            <Grid item xs={12}>
              <Box textAlign="center">
                {previewImage && (
                  <ProductImage src={previewImage} alt="Ürün önizleme" />
                )}
                <label htmlFor="icon-button-file">
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                  >
                    Ürün Fotoğrafı Yükle
                  </Button>
                </label>
              </Box>
            </Grid>

            {/* Ürün Kodu */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ürün Kodu"
                value={formData.code}
                disabled
                helperText="Otomatik oluşturulan benzersiz kod"
              />
            </Grid>

            {/* Ürün Adı */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ürün Adı"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>

            {/* Kategori Seçimi */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!categoryError}>
                <InputLabel>Kategori Seçin *</InputLabel>
                <Select
                  name="category_id"
                  value={formData.category_id || ''}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  disabled={isLoadingCategories}
                >
                  {isLoadingCategories ? (
                    <MenuItem disabled>Kategoriler yükleniyor...</MenuItem>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Kategori bulunamadı</MenuItem>
                  )}
                </Select>
                {categoryError && (
                  <FormHelperText error>{categoryError}</FormHelperText>
                )}
                <FormHelperText>
                  {isLoadingCategories ? 'Kategoriler yükleniyor...' : 
                   categories.length === 0 ? 'Henüz kategori eklenmemiş' : 
                   'Ürününüz için bir kategori seçin'}
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* Fiyat ve Para Birimi */}
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="Fiyat"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    error={!!errors.price}
                    helperText={errors.price}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Para Birimi</InputLabel>
                    <Select
                      value={formData.currency}
                      label="Para Birimi"
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    >
                      <MenuItem value="EUR">€ (Euro)</MenuItem>
                      <MenuItem value="USD">$ (Dolar)</MenuItem>
                      <MenuItem value="TRY">₺ (TL)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* KDV Oranı */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="KDV Oranı (%)"
                name="tax_rate"
                type="number"
                value={formData.tax_rate}
                onChange={(e) => setFormData({ ...formData, tax_rate: e.target.value })}
                InputProps={{
                  endAdornment: '%',
                }}
              />
            </Grid>

            {/* Açıklama */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Açıklama"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Grid>

            {/* Hizmet/Ürün Seçimi */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.is_service}
                    onChange={(e) => setFormData({ ...formData, is_service: e.target.checked })}
                    name="is_service"
                  />
                }
                label="Bu bir hizmet ürünüdür"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Ürünü Kaydet'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewProduct;
