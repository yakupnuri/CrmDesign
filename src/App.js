import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import Layout from './components/Layout/Layout';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard/Dashboard';
import ProjectList from './components/Projects/ProjectList';
import NewProject from './components/Projects/NewProject';
import ProjectDetail from './components/Projects/ProjectDetail';
import CustomerListView from './components/Customers/views/CustomerListView';
import CustomerFormView from './components/Customers/views/CustomerFormView';
import CustomerDetailView from './components/Customers/views/CustomerDetailView';
import ProductList from './components/Products/ProductList';
import NewProduct from './components/Products/NewProduct';
import ProductDetail from './components/Products/ProductDetail';
import AccountingDashboard from './components/Accounting/AccountingDashboard';
import { initializeGoogleCalendar } from './services/googleCalendar';

const AppLayout = () => {
  return (
    <>
      <Header />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "projects",
        element: <ProjectList />,
      },
      {
        path: "projects/new",
        element: <NewProject />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetail />,
      },
      {
        path: "projects/:id/edit",
        element: <ProjectDetail />,
      },
      {
        path: "customers",
        element: <CustomerListView />,
      },
      {
        path: "customers/new",
        element: <CustomerFormView />,
      },
      {
        path: "customers/:id",
        element: <CustomerDetailView />,
      },
      {
        path: "customers/:id/edit",
        element: <CustomerFormView />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "products/new",
        element: <NewProduct />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      {
        path: "products/:id/edit",
        element: <ProductDetail />,
      },
      {
        path: "accounting",
        element: <AccountingDashboard />,
      },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  initializeGoogleCalendar();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
