import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const AddMemberModal = ({ open, onClose, onAddMember }) => {
  const [memberName, setMemberName] = useState('');

  const handleAddMember = () => {
    if (memberName.trim() !== '') { // Validate if memberName is not empty
      onAddMember(memberName);
      setMemberName(''); // Clear the input field
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Add Member
        </Typography>
        <TextField
          label="Member Name"
          variant="outlined"
          fullWidth
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        <Button variant="outlined" onClick={onClose} sx={{ marginRight: 2 }}>
            Cancel
        </Button>
        <Button variant="contained" onClick={handleAddMember}>
            Add Member
        </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddMemberModal;