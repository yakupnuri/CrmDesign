import React, { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const CURRENCY_SYMBOLS = {
  TRY: '₺',
  USD: '$',
  EUR: '€'
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('TRY'); // Varsayılan para birimi TRY olarak ayarlandı
  const [rates, setRates] = useState({
    TRY: 1,
    USD: 0.034, // Örnek kur
    EUR: 0.031  // Örnek kur
  });

  const formatMoney = (amount) => {
    if (typeof amount !== 'number') return '0';
    
    const formatter = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    });
    
    return formatter.format(amount);
  };

  const updateRates = async () => {
    try {
      // Burada gerçek bir API'den güncel kurları çekebilirsiniz
      // Örnek: const response = await fetch('your-exchange-rate-api');
      // const data = await response.json();
      // setRates(data.rates);
    } catch (error) {
      console.error('Kur bilgileri güncellenirken hata oluştu:', error);
    }
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        currency, 
        setCurrency, 
        formatMoney, 
        rates, 
        updateRates 
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export default CurrencyContext;
