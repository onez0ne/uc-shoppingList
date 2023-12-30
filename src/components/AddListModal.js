import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const AddListModal = ({ open, onClose, onAddList }) => {
  const [listName, setListName] = useState('');

  const handleAddList = () => {
    if (listName.trim() !== '') {
      onAddList(listName);
      setListName('');
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', p: 4, outline: 0 }}>
        <TextField
          label="Shopping List Name"
          variant="outlined"
          fullWidth
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button variant="outlined" onClick={onClose} sx={{ marginRight: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleAddList}>
            Add Shopping List
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddListModal;