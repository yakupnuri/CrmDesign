import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import trTranslations from '../locales/tr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: {
        translation: {
          ...trTranslations,
          'settings.title': 'Ayarlar',
          'dashboard.title': 'Ana Sayfa',
          'projects.title': 'Projeler',
          'customers.title': 'Müşteriler',
          'products.title': 'Ürünler ve Hizmetler',
          'accounting.title': 'Muhasebe',
        }
      }
    },
    lng: 'tr',
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
