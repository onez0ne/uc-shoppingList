import React from 'react';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const FloatingButton = ({ onClick }) => {
  return (
    <Fab color="primary" aria-label="add" onClick={onClick} style={{ position: 'fixed', bottom: '16px', right: '16px' }}>
      <AddIcon />
    </Fab>
  );
};

export default FloatingButton;