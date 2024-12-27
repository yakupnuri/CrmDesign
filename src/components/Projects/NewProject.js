import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Autocomplete,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { tr } from 'date-fns/locale';
import { addEventToCalendar } from '../../services/googleCalendar';

const steps = ['Proje Bilgileri', 'Müşteri ve Ürün Seçimi', 'Teklif Detayları'];

const NewProject = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [addToCalendar, setAddToCalendar] = useState(true);
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    startDate: null,
    deadline: null,
    client: null,
    products: [],
    status: 'proposal',
    proposalDetails: {
      price: '',
      currency: 'TRY',
      deliveryTime: '',
      notes: '',
    }
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Projeyi kaydet
      const projectResponse = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...projectData,
          total_amount: parseFloat(projectData.proposalDetails.price),
          payment_status: 'pending'
        }),
      });

      const projectDataResponse = await projectResponse.json();

      // Müşteri cari hesabına borç kaydı ekle
      await fetch('/api/customer-account-transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: projectData.client.id,
          transaction_type: 'debit',
          amount: parseFloat(projectData.proposalDetails.price),
          description: `${projectData.name} projesi için borç kaydı`,
          project_id: projectDataResponse.id,
          transaction_date: new Date().toISOString().split('T')[0]
        }),
      });

      // Google Calendar'a ekle
      if (addToCalendar) {
        await addEventToCalendar({
          title: `Proje: ${projectData.name}`,
          description: projectData.description,
          startDate: projectData.startDate,
          endDate: projectData.deadline,
        });
      }
      navigate('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleInputChange = (field) => (event) => {
    setProjectData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleProposalChange = (field) => (event) => {
    setProjectData((prev) => ({
      ...prev,
      proposalDetails: {
        ...prev.proposalDetails,
        [field]: event.target.value,
      },
    }));
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Proje Adı"
                value={projectData.name}
                onChange={handleInputChange('name')}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Proje Açıklaması"
                value={projectData.description}
                onChange={handleInputChange('description')}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
                <DatePicker
                  label="Başlangıç Tarihi"
                  value={projectData.startDate}
                  onChange={(date) => setProjectData((prev) => ({ ...prev, startDate: date }))}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  format="dd/MM/yyyy"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
                <DatePicker
                  label="Teslim Tarihi"
                  value={projectData.deadline}
                  onChange={(date) => setProjectData((prev) => ({ ...prev, deadline: date }))}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  format="dd/MM/yyyy"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={addToCalendar}
                    onChange={(e) => setAddToCalendar(e.target.checked)}
                    color="primary"
                  />
                }
                label="Google Takvim'e Ekle"
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                options={[]} // Bu kısım API'den müşteri listesi ile doldurulacak
                getOptionLabel={(option) => option.name}
                value={projectData.client}
                onChange={(event, newValue) => {
                  setProjectData((prev) => ({ ...prev, client: newValue }));
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Müşteri Seçimi" required />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                fullWidth
                options={[]} // Bu kısım API'den ürün listesi ile doldurulacak
                getOptionLabel={(option) => option.name}
                value={projectData.products}
                onChange={(event, newValue) => {
                  setProjectData((prev) => ({ ...prev, products: newValue }));
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Ürün ve Hizmet Seçimi" />
                )}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="Teklif Tutarı"
                type="number"
                value={projectData.proposalDetails.price}
                onChange={handleProposalChange('price')}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel>Para Birimi</InputLabel>
                <Select
                  value={projectData.proposalDetails.currency}
                  onChange={handleProposalChange('currency')}
                  label="Para Birimi"
                >
                  <MenuItem value="TRY">TRY</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Teslim Süresi (Gün)"
                type="number"
                value={projectData.proposalDetails.deliveryTime}
                onChange={handleProposalChange('deliveryTime')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Teklif Notları"
                multiline
                rows={4}
                value={projectData.proposalDetails.notes}
                onChange={handleProposalChange('notes')}
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box p={3}>
      <Card elevation={0} sx={{ mb: 3, backgroundColor: 'primary.main', color: 'white' }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Yeni Proje Oluştur
          </Typography>
        </CardContent>
      </Card>

      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 2 }}>
            {renderStepContent(activeStep)}
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            {activeStep > 0 && (
              <Button onClick={handleBack}>
                Geri
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                İleri
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Teklif Oluştur
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NewProject;
