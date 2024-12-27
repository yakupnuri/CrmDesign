import axios from 'axios';

const API_URL = '/api';

export const getAllProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await axios.put(`${API_URL}/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export const addProductToProject = async (projectId, productData) => {
  try {
    const response = await axios.post(`${API_URL}/projects/${projectId}/products`, productData);
    return response.data;
  } catch (error) {
    console.error('Error adding product to project:', error);
    throw error;
  }
};

export const removeProductFromProject = async (projectId, productId) => {
  try {
    const response = await axios.delete(`${API_URL}/projects/${projectId}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing product from project:', error);
    throw error;
  }
};

export const addWorkLog = async (projectId, workLogData) => {
  try {
    const response = await axios.post(`${API_URL}/projects/${projectId}/worklogs`, workLogData);
    return response.data;
  } catch (error) {
    console.error('Error adding work log:', error);
    throw error;
  }
};

export const getProjectWorkLogs = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}/worklogs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching work logs:', error);
    throw error;
  }
};
