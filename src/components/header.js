import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch, Grid } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Header = ({ listName, onSettingsClick, onFilterToggle, showSolvedItems }) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>

            <Typography variant="h6" component="div">
              {listName}
            </Typography>

          </Grid>
          <Grid item>

            <IconButton color="inherit" onClick={onSettingsClick}>
              <SettingsIcon />
            </IconButton>
            
          </Grid>
          <Grid item sx={{ flexGrow: 1 }} />
          <Grid item>

            <Typography variant="subtitle1" component="div" color="inherit">
              Show Solved Items
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