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
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, outline: 0 }}>
        <TextField
          label="Item Name"
          variant="outlined"
          fullWidth
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
            <Button variant="outlined" onClick={onClose} sx={{ marginRight: 2 }}>
                Cancel
            </Button>
            
            <Button variant="contained" color="primary" onClick={handleAddItem}>
                Add Item
            </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddItemModal;