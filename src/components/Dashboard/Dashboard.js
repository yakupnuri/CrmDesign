import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import {
  PeopleAlt as CustomersIcon,
  AttachMoney as RevenueIcon,
  AccessTime as WorkHoursIcon,
  Inventory as ProductsIcon,
  CheckCircle as CompletedIcon,
  Pending as PendingIcon
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../../context/CurrencyContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './Dashboard.css';

const Dashboard = () => {
  const { t } = useTranslation();
  const { formatMoney } = useCurrency();
  const [stats, setStats] = useState({
    totalCustomers: 12,
    totalRevenue: 124500,
    totalWorkHours: 164,
    activeProducts: 2,
    customerGrowth: '+2 bu ay',
    revenueGrowth: '+₺12,000 bu ay',
    hoursGrowth: '+22 saat bu ay',
    productGrowth: '2 yeni ürün'
  });

  const [recentInvoices, setRecentInvoices] = useState([
    { customer: 'Ahmet Yılmaz', date: '2024-02-15', amount: 2500, status: 'Ödendi' },
    { customer: 'Ayşe Demir', date: '2024-02-14', amount: 1800, status: 'Beklemede' }
  ]);

  const [recentWork, setRecentWork] = useState([
    { project: 'Logo Tasarımı', assignee: 'Mehmet Kaya', date: '2024-02-15', status: 'Tamamlandı' },
    { project: 'Web Sitesi', assignee: 'Zeynep Yıldız', date: '2024-02-14', status: 'Devam Ediyor' }
  ]);

  const StatCard = ({ title, value, subtitle, icon: Icon, growth }) => (
    <Card sx={{ height: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="textSecondary" variant="subtitle2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
              {value}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {growth}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {subtitle}
            </Typography>
          </Box>
          <Icon sx={{ fontSize: 40, color: 'primary.main', opacity: 0.8 }} />
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* İstatistik Kartları */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Toplam Müşteri"
            value={stats.totalCustomers}
            growth={stats.customerGrowth}
            subtitle="Aktif müşteri sayısı"
            icon={CustomersIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Toplam Gelir"
            value={`₺${stats.totalRevenue.toLocaleString()}`}
            growth={stats.revenueGrowth}
            subtitle="Mevcut dönem geliri"
            icon={RevenueIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Toplam Çalışma"
            value={`${stats.totalWorkHours} saat`}
            growth={stats.hoursGrowth}
            subtitle="Toplam çalışma süresi"
            icon={WorkHoursIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Aktif Ürünler"
            value={stats.activeProducts}
            growth={stats.productGrowth}
            subtitle="Aktif ürün sayısı"
            icon={ProductsIcon}
          />
        </Grid>

        {/* Son Faturalar ve Çalışmalar */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Son Faturalar
              </Typography>
              <Divider sx={{ my: 2 }} />
              {recentInvoices.map((invoice, index) => (
                <Box key={index} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1">{invoice.customer}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {invoice.date}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography variant="subtitle1" sx={{ mr: 1 }}>
                      ₺{invoice.amount.toLocaleString()}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: invoice.status === 'Ödendi' ? 'success.main' : 'warning.main',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {invoice.status === 'Ödendi' ? <CompletedIcon sx={{ fontSize: 16, mr: 0.5 }} /> : <PendingIcon sx={{ fontSize: 16, mr: 0.5 }} />}
                      {invoice.status}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Son Çalışmalar
              </Typography>
              <Divider sx={{ my: 2 }} />
              {recentWork.map((work, index) => (
                <Box key={index} sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1">{work.project}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {work.assignee}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography variant="caption" color="textSecondary" sx={{ mr: 1 }}>
                      {work.date}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: work.status === 'Tamamlandı' ? 'success.main' : 'info.main',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {work.status === 'Tamamlandı' ? <CompletedIcon sx={{ fontSize: 16, mr: 0.5 }} /> : <PendingIcon sx={{ fontSize: 16, mr: 0.5 }} />}
                      {work.status}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Takvim */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                İş Takvimi
              </Typography>
              <Box sx={{ mt: 2, height: 400 }}>
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView="dayGridMonth"
                  locale="tr"
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth'
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
