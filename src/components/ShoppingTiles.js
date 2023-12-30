import React from 'react';
import { Card, CardContent, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import ConfirmationModal from './ConfirmationModal';
import { useNavigate } from 'react-router-dom';

const ShoppingTiles = ({ lists, onListToggle, onListDelete, showArchivedLists, onClose, onConfirm, onListArchive, userRole }) => {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = React.useState(false);
  const [listToDelete, setListToDelete] = React.useState(null);

  const navigate = useNavigate();

  const handleArchiveClick = (list) => {
    onListArchive(list.id); // Toggle via function from parent route
  };

  const handleCardClick = (list) => {
    navigate(`/shopping-list/${list.id}`); // Navigate to specific shoppinglist by ID
  };

  // Only show the lists of which the user is member or owner of
  const filteredLists = lists.filter(
    (list) => userRole === 'Owner' || userRole === 'Member'
  );

  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {lists.map((list) => (
          <Card key={list.id}
            sx={{ minWidth: 200, flexGrow: 1, backgroundColor: list.archived ? '#d3d3d3' : 'background.paper' }}
            onClick={() => handleCardClick(list)}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                {list.name}
              </Typography>
              {userRole === 'Owner' && (
                <IconButton edge="end" onClick={(e) => { e.stopPropagation(); handleArchiveClick(list); }}>
                  <ArchiveIcon />
                </IconButton>
              )}
              {userRole === 'Owner' && ( 
                <IconButton edge="end" onClick={(e) => { e.stopPropagation(); onListDelete(list); }}>
                  <DeleteIcon />
                </IconButton>
               )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default ShoppingTiles;