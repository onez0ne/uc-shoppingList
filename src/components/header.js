import React from 'react';
import { AppBar, Toolbar, Typography, Switch, Grid, IconButton, MenuItem, Select } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Header = ({ title, showSettingsButton = true, onSettingsClick, onFilterToggle, showSolvedItems, toggleLabel, navigate, showBackButton, userRole, setUserRole, themeMode, themeToggler }) => {

  const { t } = useTranslation();

  const handleRoleChange = (event) => { // Role change for development purposes
    setUserRole(event.target.value); 
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          {showBackButton && (
            <IconButton color="inherit" onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>

          <LanguageSwitcher />

          <Select
            value={userRole}
            onChange={handleRoleChange}
            sx={{ color: 'white', '.MuiSvgIcon-root': { color: 'white' } }}
          >
            <MenuItem value="Owner">{t('owner')}</MenuItem>
            <MenuItem value="Member">{t('member')}</MenuItem>
          </Select>
          <IconButton color="inherit" onClick={themeToggler}>
            {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Switch checked={showSolvedItems} onChange={onFilterToggle} color="default" />
          {showSettingsButton && (
            <IconButton color="inherit" onClick={onSettingsClick}>
              <SettingsIcon />
            </IconButton>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
