import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ConfirmationModal = ({ open, onClose, onConfirm, message }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Confirm Action
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
          {message}
        </Typography>
        <Button variant="contained" color="error" sx={{ marginRight: 2 }} onClick={onConfirm}>
          Confirm
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;