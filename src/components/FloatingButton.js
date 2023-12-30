import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const FloatingButton = ({ onClick }) => {
  return (
    <Fab 
      color="primary" 
      aria-label="add" 
      onClick={onClick} 
      sx={{
        position: 'fixed', 
        bottom: { xs: '20px', sm: '16px' },
        right: { xs: '20px', sm: '16px' },
        zIndex: 1050
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default FloatingButton;