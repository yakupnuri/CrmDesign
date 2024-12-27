import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EmailIcon from '@mui/icons-material/Email';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { useCurrency } from '../../context/CurrencyContext';

const InvoiceList = ({ invoices }) => {
  const { formatMoney } = useCurrency();

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'success';
      case 'overdue': return 'error';
      case 'draft': return 'default';
      case 'sent': return 'primary';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'paid': return 'Ödendi';
      case 'overdue': return 'Gecikmiş';
      case 'draft': return 'Taslak';
      case 'sent': return 'Gönderildi';
      case 'cancelled': return 'İptal Edildi';
      default: return status;
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fatura No</TableCell>
            <TableCell>Müşteri</TableCell>
            <TableCell>Tarih</TableCell>
            <TableCell>Vade</TableCell>
            <TableCell align="right">Tutar</TableCell>
            <TableCell align="right">KDV</TableCell>
            <TableCell align="right">Toplam</TableCell>
            <TableCell>Durum</TableCell>
            <TableCell align="center">İşlemler</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.invoice_number}</TableCell>
              <TableCell>{invoice.customer_name}</TableCell>
              <TableCell>
                {format(new Date(invoice.issue_date), 'dd MMM yyyy', { locale: nl })}
              </TableCell>
              <TableCell>
                {format(new Date(invoice.due_date), 'dd MMM yyyy', { locale: nl })}
              </TableCell>
              <TableCell align="right">
                {formatMoney(invoice.subtotal)}
              </TableCell>
              <TableCell align="right">
                {formatMoney(invoice.tax_amount)}
              </TableCell>
              <TableCell align="right">
                {formatMoney(invoice.total_amount)}
              </TableCell>
              <TableCell>
                <Chip
                  label={getStatusLabel(invoice.status)}
                  color={getStatusColor(invoice.status)}
                  size="small"
                />
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Düzenle">
                  <IconButton size="small" color="primary">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="PDF İndir">
                  <IconButton size="small" color="primary">
                    <PictureAsPdfIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="E-posta Gönder">
                  <IconButton size="small" color="primary">
                    <EmailIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sil">
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InvoiceList;
