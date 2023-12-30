import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AddMemberModal = ({ open, onClose, onAddMember }) => {

  const { t } = useTranslation();

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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, mb: 2 }}>
          {t('headingAddMember')}
        </Typography>
        <TextField
          label={t('labelMemberName')}
          variant="outlined"
          fullWidth
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
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
            {t('cancel')}
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAddMember}
            sx={{ width: '100%' }}
          >
            {t('addMember')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddMemberModal;