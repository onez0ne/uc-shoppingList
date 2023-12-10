import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

const ShoppingList = ({ items, onItemToggle, onItemDelete, showSolvedItems }) => {
  // Ensure that items is always an array
  const itemsArray = Array.isArray(items) ? items : [];

  // Moving unsolved items to the top of the list
  const sortedItems = [...itemsArray].sort((a, b) => {
    if (a.solved && !b.solved) {
      return 1;
    } else if (!a.solved && b.solved) {
      return -1;
    }
    return 0;
  });

  const renderCheckCircle = (item) => {
    if (item.solved) {
      return <CheckCircleIcon style={{ color: 'gray', marginRight: '10px' }} />;
    } else {
      return <PanoramaFishEyeIcon style={{ color: 'blue', marginRight: '10px' }} />;
    }
  };

  return (
    <List>
      {sortedItems &&
        sortedItems
          .filter(item => showSolvedItems || !item.solved) // Filter based on showSolvedItems
          .map((item) => (
            <ListItem key={item.id} button onClick={() => onItemToggle(item)}>
              <IconButton edge="end" onClick={() => onItemToggle(item)}>
                {renderCheckCircle(item)}
              </IconButton>

              <ListItemText primary={item.name} />

              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => onItemDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
    </List>
  );
};

export default ShoppingList;
