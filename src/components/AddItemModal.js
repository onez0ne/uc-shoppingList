import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const AddItemModal = ({ open, onClose, onAddItem }) => {
  const [itemName, setItemName] = useState('');

  const handleAddItem = () => {
    if (itemName.trim() !== '') { // Validate if itemName is not empty
      onAddItem(itemName);
      setItemName('');
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: '90%', sm: '400px' },
        bgcolor: 'background.paper',
        p: 4,
        pt: 2,
        pb: 3,
        display: 'flex',
        flexDirection: 'column',
        outline: 'none',
      }}>
        <TextField
          label="Item Name"
          variant="outlined"
          fullWidth
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mt: 2,
        }}>
          <Button 
            variant="outlined" 
            onClick={onClose} 
            sx={{ width: '100%' }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddItem}
            sx={{ width: '100%' }}
          >
            Add Item
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddItemModal;