// Para birimi formatı
export const formatCurrency = (amount, currency = 'EUR') => {
  const localeMap = {
    EUR: 'nl-NL',
    USD: 'en-US',
    TRY: 'tr-TR'
  };

  return new Intl.NumberFormat(localeMap[currency], {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Tarih formatı
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

// Dosya boyutu formatı
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
