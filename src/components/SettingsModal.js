import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Chip,
} from '@mui/material';
import { fetchUserById } from '../calls';
import AddMemberModal from './AddMemberModal';
import ConfirmationModal from './ConfirmationModal';
import { useTranslation } from 'react-i18next';

const SettingsModal = ({ open, onClose, currentName, onNameChange, userRole, ownerName }) => {
  const { t } = useTranslation();
  const [shoppingListName, setShoppingListName] = useState(currentName);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleLeaveSharedList = () => {
    setShowConfirmationModal(true);
  };  

  const handleAddMemberClick = () => {
    setIsAddMemberModalOpen(true);
  };

  const handleAddMember = (newMember) => {
    const memberObject = { name: newMember, role: 'Member' };
    setMembers([...members, memberObject]);
  };


  const handleRemoveMember = (index) => {
    if (userRole === 'Owner') {
      const updatedMembers = [...members];
      updatedMembers.splice(index, 1);
      setMembers(updatedMembers);
    }
  };

  const handleSaveChanges = () => {
    onNameChange(shoppingListName); // Update the name in the parent component
    onClose(); // Close the modal after saving
  };

  const handleLeaveConfirmation = () => { 
    setShowConfirmationModal(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '70%' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t('headingListSettings')}
        </Typography>

        {/* Name of the Shopping List */}
        {userRole === 'Owner' && (
          <TextField
            label={t('labelShoppingListName')}
            fullWidth
            value={shoppingListName}
            onChange={(e) => setShoppingListName(e.target.value)}
          />
        )}
       
        <Typography variant="subtitle1" component="div" sx={{ marginTop: 2 }}>
        {t('labelOwner')}: {ownerName}
        </Typography>

        {/* Members of the List */}
        <Typography variant="subtitle1" component="div" sx={{ marginTop: 2 }}>
          {t('headingMembers')}
        </Typography>

        {userRole === 'Owner' && (
          <Button
            variant="outlined"
            onClick={handleAddMemberClick}
            sx={{
              mt: 2,
              width: { sm: 'auto', md: 'fit-content' },
            }}
          >
            {t('buttonAddMember')}
          </Button>
        )}

        
        {/* Add Member Modal */}
        <AddMemberModal
            open={isAddMemberModalOpen}
            onClose={() => setIsAddMemberModalOpen(false)}
            onAddMember={handleAddMember}
        />

        {/* List of Members */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
            <Box sx={{ marginTop: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {members.map((member, index) => (
                <Chip
                    key={index}
                    label={member.name}
                    onDelete={userRole === 'Owner' ? () => handleRemoveMember(index) : undefined}
                    color="primary"
                    sx={{ backgroundColor: '#2196F3', color: 'white' }}
                />
                ))}
            </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'flex-end',
            gap: 2,
            mt: 2,
          }}
        >
        {userRole === 'Member' && (
        <Button
          variant="contained"
          color="error"
          onClick={handleLeaveSharedList}
          sx={{ mt: 2 }} 
        >
          {t('buttonLeaveSharedList')}
        </Button>
      )}
      <Button
        variant="outlined"
        onClick={onClose}
        sx={{ mt: 2 }}
      >
        {t('cancel')}
      </Button>
      <Button
        variant="contained"
        onClick={handleSaveChanges}
        sx={{ mt: 2 }}
      >
        {t('save')}
      </Button>

      {/* Leave confirmation modal */}
      <ConfirmationModal
        open={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleLeaveConfirmation}
        message={t('messageConfirmLeave')}
        />
    </Box>
      </Box>
    </Modal>
  );
};

export default SettingsModal;