import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  IconButton,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  LinearProgress,
  Tooltip,
  Card,
  CardContent,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'proposal': 'info',
      'in_progress': 'warning',
      'completed': 'success',
      'revision': 'error',
      'pending': 'default'
    };
    return statusColors[status] || 'default';
  };

  const getStatusLabel = (status) => {
    const statusLabels = {
      'proposal': 'Teklif Aşamasında',
      'in_progress': 'Devam Ediyor',
      'completed': 'Tamamlandı',
      'revision': 'Revizyon Sürecinde',
      'pending': 'Beklemede'
    };
    return statusLabels[status] || status;
  };

  const filteredProjects = statusFilter === 'all' 
    ? projects 
    : projects.filter(project => project.status === statusFilter);

  const handleNewProject = () => {
    navigate('/projects/new');
  };

  const handleViewProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <Box p={3}>
      <Card elevation={0} sx={{ mb: 3, backgroundColor: 'primary.main', color: 'white' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Proje Yönetimi</Typography>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={handleNewProject}
              sx={{ backgroundColor: 'white', color: 'primary.main' }}
            >
              Yeni Proje
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Durum Filtresi</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Durum Filtresi"
          >
            <MenuItem value="all">Tümü</MenuItem>
            <MenuItem value="proposal">Teklif Aşamasında</MenuItem>
            <MenuItem value="in_progress">Devam Ediyor</MenuItem>
            <MenuItem value="revision">Revizyon Sürecinde</MenuItem>
            <MenuItem value="completed">Tamamlandı</MenuItem>
            <MenuItem value="pending">Beklemede</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Proje Adı</TableCell>
              <TableCell>Müşteri</TableCell>
              <TableCell>Başlangıç</TableCell>
              <TableCell>Teslim Tarihi</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>İlerleme</TableCell>
              <TableCell align="right">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow 
                key={project.id}
                sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
              >
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {project.name}
                  </Typography>
                </TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>{new Date(project.startDate).toLocaleDateString('tr-TR')}</TableCell>
                <TableCell>{new Date(project.deadline).toLocaleDateString('tr-TR')}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(project.status)}
                    color={getStatusColor(project.status)}
                    size="small"
                    sx={{ minWidth: 100 }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={project.progress} 
                      sx={{ flexGrow: 1 }}
                    />
                    <Typography variant="caption">
                      {project.progress}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Görüntüle">
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleViewProject(project.id)}
                    >
                      <ViewIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Düzenle">
                    <IconButton 
                      size="small" 
                      color="info"
                      onClick={() => navigate(`/projects/${project.id}/edit`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Zaman Çizelgesi">
                    <IconButton 
                      size="small" 
                      color="secondary"
                      onClick={() => navigate(`/projects/${project.id}/timeline`)}
                    >
                      <TimelineIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProjectList;
