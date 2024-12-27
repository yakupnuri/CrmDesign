import React from 'react';
import { TableRow, TableCell, Typography, IconButton, Tooltip } from '@mui/material';
import {
  Edit as EditIcon,
  Visibility as ViewIcon,
  AssignmentInd as ProjectIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ProjectStatusChip, KvkkStatusChip } from './CustomerStatusChip';

const CustomerTableRow = ({ customer }) => {
  const navigate = useNavigate();

  return (
    <TableRow sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
      <TableCell>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {customer.name}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {customer.company}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">{customer.email}</Typography>
        <Typography variant="body2">{customer.phone}</Typography>
      </TableCell>
      <TableCell>
        {customer.projects?.map((project) => (
          <ProjectStatusChip key={project.id} project={project} />
        ))}
      </TableCell>
      <TableCell>
        <KvkkStatusChip status={customer.kvkkStatus} />
      </TableCell>
      <TableCell>
        {new Date(customer.lastActivity).toLocaleDateString('tr-TR')}
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Görüntüle">
          <IconButton 
            size="small"
            onClick={() => navigate(`/customers/${customer.id}`)}
          >
            <ViewIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Düzenle">
          <IconButton 
            size="small"
            onClick={() => navigate(`/customers/${customer.id}/edit`)}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Yeni Proje">
          <IconButton 
            size="small"
            onClick={() => navigate(`/projects/new?customerId=${customer.id}`)}
          >
            <ProjectIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default CustomerTableRow;
