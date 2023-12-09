import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Chip,
} from '@mui/material';
import AddMemberModal from './AddMemberModal';
import ConfirmationModal from './ConfirmationModal';

const SettingsModal = ({ open, onClose, currentName, onNameChange }) => {
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
    setMembers([...members, newMember]);
  };


  const handleRemoveMember = (index) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  const handleSaveChanges = () => {
    onNameChange(shoppingListName); // Update the name in the parent component
    onClose(); // Close the modal after saving
  };

  const handleLeaveConfirmation = () => { //FIX: Leaving the list needs to be implemented after User roles in the next version
    setShowConfirmationModal(false); // This will trigger the leaving of the list and return to the list of lists
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70%', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shopping List Settings
        </Typography>

        {/* Name of the Shopping List */}
        <TextField
          label="Shopping List Name"
          fullWidth
          value={shoppingListName}
          onChange={(e) => setShoppingListName(e.target.value)}
        />

        {/* Owner of the List */}
        <Typography variant="subtitle1" component="div" sx={{ marginTop: 2 }}>
          Owner: John Doe
        </Typography>

        {/* Members of the List */}
        <Typography variant="subtitle1" component="div" sx={{ marginTop: 2 }}>
          Members:
        </Typography>
    
        {/* Add Member Button */}
        <Button variant="outlined" onClick={handleAddMemberClick}>
            + Add Member
        </Button>
¨
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
                    label={member}
                    onDelete={() => handleRemoveMember(index)}
                    color="primary"
                    sx={{ backgroundColor: '#2196F3', color: 'white' }}
                />
                ))}
            </Box>
        </Box>

    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>

        {/* Leave shared list button */}
        <Button variant="contained" color="error" onClick={handleLeaveSharedList}>
            Leave Shared List
        </Button>


        <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={onClose} sx={{ marginRight: 2 }}>
                Cancel
            </Button>
            <Button variant="contained" onClick={handleSaveChanges} color="primary">
                Save
            </Button>
        </Box>

      {/* Leave confirmation modal */}
      <ConfirmationModal
        open={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={handleLeaveConfirmation}
        message="Are you sure you want to leave the shared list?"
        />
    </Box>
      </Box>
    </Modal>
  );
};

export default SettingsModal;