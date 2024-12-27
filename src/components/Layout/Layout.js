import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assignment as ProjectIcon,
  People as CustomerIcon,
  Inventory as ProductIcon,
  Settings as SettingsIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CurrencySelector from '../common/CurrencySelector';

const drawerWidth = 240;

const menuItems = [
  {
    text: 'dashboard.title',
    icon: <DashboardIcon />,
    path: '/'
  },
  {
    text: 'projects.title',
    icon: <ProjectIcon />,
    path: '/projects'
  },
  {
    text: 'customers.title',
    icon: <CustomerIcon />,
    path: '/customers'
  },
  {
    text: 'products.title',
    icon: <ProductIcon />,
    path: '/products'
  },
  {
    text: 'accounting.title',
    icon: <AccountBalanceIcon />,
    path: '/accounting'
  },
  {
    text: 'settings.title',
    icon: <SettingsIcon />,
    path: '/settings'
  }
];

const Layout = ({ children }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ 
        backgroundColor: theme.palette.primary.main, 
        color: theme.palette.primary.contrastText,
        minHeight: '64px !important'
      }}>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
          Freelancer CRM
        </Typography>
      </Toolbar>
      <Divider />
      <List sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'inherit',
                  minWidth: '40px'
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={t(item.text)} 
                sx={{
                  color: location.pathname === item.path ? 'primary.main' : 'inherit',
                  '& .MuiTypography-root': { 
                    fontWeight: 500 
                  } 
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          borderBottom: `1px solid ${theme.palette.divider}`,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
            {menuItems.find(item => item.path === location.pathname)?.text ? t(menuItems.find(item => item.path === location.pathname)?.text) : 'Freelancer CRM'}
          </Typography>
          <CurrencySelector />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.default
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: theme.palette.grey[50],
          minHeight: '100vh',
          mt: '64px'
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
