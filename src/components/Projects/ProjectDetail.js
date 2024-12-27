import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Check as CheckIcon,
  Assignment as RevisionIcon,
  CloudUpload as UploadIcon,
  Download as DownloadIcon,
  Event as CalendarIcon,
} from '@mui/icons-material';
import { addEventToCalendar } from '../../services/googleCalendar';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [revisionDialogOpen, setRevisionDialogOpen] = useState(false);
  const [newRevision, setNewRevision] = useState({
    description: '',
    deadline: '',
  });

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`);
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  const handleAddRevision = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}/revisions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRevision),
      });

      if (response.ok) {
        setRevisionDialogOpen(false);
        fetchProjectDetails();
        setNewRevision({ description: '', deadline: '' });
      }
    } catch (error) {
      console.error('Error adding revision:', error);
    }
  };

  const handleCompleteProject = async () => {
    try {
      await fetch(`http://localhost:5000/api/projects/${id}/complete`, {
        method: 'POST',
      });
      fetchProjectDetails();
    } catch (error) {
      console.error('Error completing project:', error);
    }
  };

  const handleAddToCalendar = async () => {
    try {
      await addEventToCalendar({
        title: `Proje: ${project.name}`,
        description: project.description,
        startDate: project.startDate,
        endDate: project.deadline,
      });
      alert('Proje Google Takvim\'e eklendi!');
    } catch (error) {
      console.error('Error adding to calendar:', error);
      alert('Takvime eklenirken bir hata oluştu.');
    }
  };

  if (!project) {
    return <Typography>Yükleniyor...</Typography>;
  }

  return (
    <Box p={3}>
      <Card elevation={0} sx={{ mb: 3, backgroundColor: 'primary.main', color: 'white' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {project.name}
            </Typography>
            <Box>
              <Chip
                label={project.status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}
                color={project.status === 'completed' ? 'success' : 'warning'}
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddToCalendar}
                startIcon={<CalendarIcon />}
                sx={{ mr: 1, backgroundColor: 'white', color: 'primary.main' }}
              >
                Takvime Ekle
              </Button>
              {project.status !== 'completed' && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleCompleteProject()}
                  startIcon={<CheckIcon />}
                  sx={{ backgroundColor: 'white', color: 'primary.main' }}
                >
                  Projeyi Tamamla
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Proje Detayları
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Başlangıç Tarihi
                  </Typography>
                  <Typography>
                    {new Date(project.startDate).toLocaleDateString('tr-TR')}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Teslim Tarihi
                  </Typography>
                  <Typography>
                    {new Date(project.deadline).toLocaleDateString('tr-TR')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Açıklama
                  </Typography>
                  <Typography>{project.description}</Typography>
                </Grid>
              </Grid>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Müşteri Bilgileri
                </Typography>
                <Typography>{project.client?.name}</Typography>
                <Typography color="textSecondary">
                  {project.client?.email}
                </Typography>
              </Box>

              <Box mt={4}>
                <Typography variant="h6" gutterBottom>
                  Ürün ve Hizmetler
                </Typography>
                <List>
                  {project.products?.map((product) => (
                    <ListItem key={product.id}>
                      <ListItemIcon>
                        <CheckIcon color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={product.name}
                        secondary={`${product.price} ${product.currency}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">
                  Revizyon Geçmişi
                </Typography>
                <IconButton
                  color="primary"
                  onClick={() => setRevisionDialogOpen(true)}
                  disabled={project.status === 'completed'}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Timeline>
                {project.revisions?.map((revision, index) => (
                  <TimelineItem key={revision.id}>
                    <TimelineOppositeContent color="textSecondary">
                      {new Date(revision.date).toLocaleDateString('tr-TR')}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color="primary">
                        <RevisionIcon />
                      </TimelineDot>
                      {index < project.revisions.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="subtitle2">
                          {revision.description}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Teslim: {new Date(revision.deadline).toLocaleDateString('tr-TR')}
                        </Typography>
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Dosyalar
              </Typography>
              <List>
                {project.files?.map((file) => (
                  <ListItem
                    key={file.id}
                    secondaryAction={
                      <IconButton edge="end" size="small">
                        <DownloadIcon />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <UploadIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      secondary={new Date(file.uploadDate).toLocaleDateString('tr-TR')}
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<UploadIcon />}
                sx={{ mt: 2 }}
                disabled={project.status === 'completed'}
              >
                Dosya Yükle
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={revisionDialogOpen} onClose={() => setRevisionDialogOpen(false)}>
        <DialogTitle>Yeni Revizyon Ekle</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Revizyon Açıklaması"
            multiline
            rows={4}
            value={newRevision.description}
            onChange={(e) => setNewRevision({ ...newRevision, description: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Teslim Tarihi"
            type="date"
            value={newRevision.deadline}
            onChange={(e) => setNewRevision({ ...newRevision, deadline: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRevisionDialogOpen(false)}>İptal</Button>
          <Button onClick={handleAddRevision} variant="contained">
            Revizyon Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProjectDetail;
