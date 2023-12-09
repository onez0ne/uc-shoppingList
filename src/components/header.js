import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Switch, Grid, IconButton, MenuItem, Select } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = ({ title, showSettingsButton = true, onSettingsClick, onFilterToggle, showSolvedItems, toggleLabel, navigate, showBackButton, userRole, setUserRole }) => {

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
            <Grid item>
              <IconButton color="inherit" onClick={onSettingsClick}>
                <SettingsIcon />
              </IconButton>
            </Grid>
          {/* Dropdown for switching user role for development purposes */}
          <Grid item>
            <Select
              value={userRole}
              onChange={handleRoleChange}
              style={{ background: 'white' }}
            >
              <MenuItem value="Owner">Owner</MenuItem>
              <MenuItem value="Member">Member</MenuItem>
            </Select>
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} />
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
