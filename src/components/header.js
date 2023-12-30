import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Switch, Grid, IconButton, MenuItem, Select } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header = ({ title, showSettingsButton = true, onSettingsClick, onFilterToggle, showSolvedItems, toggleLabel, navigate, showBackButton, userRole, setUserRole, themeMode, themeToggler }) => {

  const [roleMenuAnchor, setRoleMenuAnchor] = useState(null);

  const handleRoleChange = (event) => { // Role change for development purposes
    setRoleMenuAnchor(null);
    setUserRole(event.target.value); 
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container alignItems="center">
          {showBackButton && (
            <Grid item>
              <IconButton color="inherit" onClick={() => navigate(-1)}>
                <ArrowBackIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item>
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          </Grid>
          {showSettingsButton && (
            <Grid item>
              <IconButton color="inherit" onClick={onSettingsClick}>
                <SettingsIcon />
              </IconButton>
            </Grid>
          )}
          {/* Dropdown for switching user role for development purposes */}
          <Grid item>
            <Select
              value={userRole}
              onChange={handleRoleChange}
              style={{ background: 'background.paper' }}
            >
              <MenuItem value="Owner">Owner</MenuItem>
              <MenuItem value="Member">Member</MenuItem>
            </Select>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} />
          <Grid item>
          <IconButton color="inherit" onClick={themeToggler}>
              {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Grid>          
          <Grid item>
            <Typography variant="subtitle1" component="div" color="inherit">
              {toggleLabel}
            </Typography>
          </Grid>
          <Grid item>
            <Switch checked={showSolvedItems} onChange={onFilterToggle} color="default" />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
