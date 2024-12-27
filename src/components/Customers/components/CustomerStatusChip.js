import React from 'react';
import { Chip } from '@mui/material';

export const ProjectStatusChip = ({ project }) => {
  const getProjectStatusColor = (status) => {
    const statusColors = {
      active: 'success',
      completed: 'default',
      pending: 'warning'
    };
    return statusColors[status] || 'default';
  };

  return (
    <Chip
      label={project.name}
      size="small"
      color={getProjectStatusColor(project.status)}
      sx={{ mr: 0.5, mb: 0.5 }}
    />
  );
};

export const KvkkStatusChip = ({ status }) => {
  return (
    <Chip
      label={status ? "Onaylandı" : "Bekliyor"}
      color={status ? "success" : "warning"}
      size="small"
    />
  );
};
