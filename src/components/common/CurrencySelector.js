import React from 'react';
import { 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel 
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../../context/CurrencyContext';

const CurrencySelector = () => {
  const { t } = useTranslation();
  const { currency, setCurrency } = useCurrency();

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel>{t('common.currency')}</InputLabel>
      <Select
        value={currency}
        label={t('common.currency')}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <MenuItem value="TRY">{t('common.currencies.TRY')}</MenuItem>
        <MenuItem value="USD">{t('common.currencies.USD')}</MenuItem>
        <MenuItem value="EUR">{t('common.currencies.EUR')}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;
