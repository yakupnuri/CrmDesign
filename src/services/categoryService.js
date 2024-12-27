import axios from 'axios';

const API_URL = 'http://localhost:4000/api/categories';

export const CategoryService = {
  // Tüm kategorileri getir
  getAllCategories: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error(error.response?.data?.message || 'Kategoriler yüklenirken hata oluştu');
    }
  },

  // Yeni kategori ekle
  createCategory: async (categoryData) => {
    try {
      const response = await axios.post(API_URL, categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw new Error(error.response?.data?.message || 'Kategori eklenirken hata oluştu');
    }
  },

  // Kategori güncelle
  updateCategory: async (id, categoryData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, categoryData);
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw new Error(error.response?.data?.message || 'Kategori güncellenirken hata oluştu');
    }
  },

  // Kategori sil
  deleteCategory: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw new Error(error.response?.data?.message || 'Kategori silinirken hata oluştu');
    }
  }
};
