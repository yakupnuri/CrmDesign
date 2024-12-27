import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../../../config/constants';

const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/customers`);
      if (!response.ok) {
        throw new Error('Müşteriler yüklenirken bir hata oluştu');
      }
      const data = await response.json();
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addCustomer = async (customerData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Müşteri eklenirken bir hata oluştu');
      }

      await fetchCustomers();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateCustomer = async (id, customerData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/customers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Müşteri güncellenirken bir hata oluştu');
      }

      await fetchCustomers();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/customers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Müşteri silinirken bir hata oluştu');
      }

      await fetchCustomers();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    loading,
    error,
    fetchCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  };
};

export default useCustomers;
