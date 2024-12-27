import axios from 'axios';

const API_URL = '/api';

export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

export const getRevenueStats = async (period = 'month') => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/revenue?period=${period}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching revenue stats:', error);
    throw error;
  }
};

export const getProjectStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project stats:', error);
    throw error;
  }
};

export const getCustomerStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/customers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer stats:', error);
    throw error;
  }
};

export const getRecentActivities = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/activities`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    throw error;
  }
};

export const getUpcomingDeadlines = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard/deadlines`);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming deadlines:', error);
    throw error;
  }
};
