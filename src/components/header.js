import React from 'react';
import { AppBar, Toolbar, Typography, Switch, Grid, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = ({ title, showSettingsButton = true, onSettingsClick, onFilterToggle, showSolvedItems, toggleLabel, navigate, showBackButton }) => {
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