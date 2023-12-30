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
          label="Shopping List Name"
          variant="outlined"
          fullWidth
          value={listName}
          onChange={(e) => setListName(e.target.value)}
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
            onClick={handleAddList}
            sx={{ width: '100%' }}
          >
            Add Shopping List
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddListModal;