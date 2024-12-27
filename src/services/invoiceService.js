import axios from 'axios';

const API_URL = '/api';

export const getAllInvoices = async () => {
  try {
    const response = await axios.get(`${API_URL}/invoices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

export const getInvoiceById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching invoice:', error);
    throw error;
  }
};

export const createInvoice = async (invoiceData) => {
  try {
    const response = await axios.post(`${API_URL}/invoices`, invoiceData);
    return response.data;
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw error;
  }
};

export const updateInvoice = async (id, invoiceData) => {
  try {
    const response = await axios.put(`${API_URL}/invoices/${id}`, invoiceData);
    return response.data;
  } catch (error) {
    console.error('Error updating invoice:', error);
    throw error;
  }
};

export const deleteInvoice = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/invoices/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting invoice:', error);
    throw error;
  }
};

export const getInvoicesByCustomer = async (customerId) => {
  try {
    const response = await axios.get(`${API_URL}/customers/${customerId}/invoices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer invoices:', error);
    throw error;
  }
};

export const getInvoicesByProject = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}/invoices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project invoices:', error);
    throw error;
  }
};
