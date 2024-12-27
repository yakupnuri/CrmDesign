export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const CURRENCY_FORMATS = {
  TRY: {
    locale: 'tr-TR',
    currency: 'TRY',
  },
  USD: {
    locale: 'en-US',
    currency: 'USD',
  },
  EUR: {
    locale: 'de-DE',
    currency: 'EUR',
  },
};
