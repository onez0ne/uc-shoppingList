import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ConfirmationModal = ({ open, onClose, onConfirm, message }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '400px' },
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Typography variant="h6" component="div" sx={{ textAlign: 'left', mb: 2 }}>
          Confirm Action
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
          {message}
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'flex-end',
          gap: 1,
          '& > button': {
            width: { xs: '100%', sm: 'auto' },
            mt: { xs: 1, sm: 0 },
          },
        }}>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Confirm
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;