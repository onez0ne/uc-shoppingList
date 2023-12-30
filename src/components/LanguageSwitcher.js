import React from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select } from '@mui/material';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      labelId="language-select-label"
      id="language-select"
      value={i18n.language}
      onChange={changeLanguage}
      sx={{ color: 'white', borderColor: 'white' }}
      variant="standard"
    >
      <MenuItem value="en">EN</MenuItem>
      <MenuItem value="cs">CS</MenuItem>
    </Select>
  );
};

export default LanguageSwitcher;