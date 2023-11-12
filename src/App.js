import React, { useState } from 'react';
import Header from './components/Header';
import SettingsModal from './components/SettingsModal';
import ShoppingList from './components/ShoppingList';
import AddItemModal from './components/AddItemModal';
import FloatingButton from './components/FloatingButton';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';


const theme = createTheme();

function App() {
  // Default states START
  const [showSolvedItems, setShowSolvedItems] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [shoppingListName, setShoppingListName] = useState("My Shopping List");
  // Default states END

  const [items, setItems] = useState([ //Items are held here
    { id: 1, name: 'Potatoes', solved: false },
    { id: 2, name: 'Fish', solved: false },
    { id: 3, name: 'Bread', solved: false },
    { id: 4, name: 'Carrots', solved: false },
  ]);

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
  };

  const handleShoppingListNameChange = (newName) => {
    setShoppingListName(newName);
  };

  const handleFilterToggle = () => {
    setShowSolvedItems(!showSolvedItems); // Toggle the state
  };

  const handleItemToggle = (clickedItem) => {
    const updatedItems = items.map((item) =>
      item.id === clickedItem.id ? { ...item, solved: !item.solved } : item
    );
  
    // Move unsolved items to the beginning, and solved items to the end
    const sortedItems = updatedItems.sort((a, b) => {
      if (a.solved && !b.solved) {
        return 1;
      } else if (!a.solved && b.solved) {
        return -1;
      }
      return 0;
    });
  
    setItems(sortedItems);
  };

  const handleItemDelete = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const openAddItemModal = () => {
    setIsAddItemModalOpen(true);
  };

  const closeAddItemModal = () => {
    setIsAddItemModalOpen(false);
  };

  const handleAddItem = (newItem) => {
    const newItemWithId = { id: Date.now(), name: newItem, solved: false }; // Date.now Gives unique ID to the item added
    const updatedItems = [...items, newItemWithId];
    setItems(updatedItems);
    setIsAddItemModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        listName={shoppingListName}
        onSettingsClick={handleSettingsClick}
        onFilterToggle={handleFilterToggle}
        showSolvedItems={showSolvedItems}
      />
      <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
        <ShoppingList
          items={items}
          onItemToggle={handleItemToggle}
          onItemDelete={handleItemDelete}
          showSolvedItems={showSolvedItems}
        />
      </Container>
      <FloatingButton onClick={openAddItemModal} />

      <AddItemModal open={isAddItemModalOpen} onClose={closeAddItemModal} onAddItem={handleAddItem} />
      
      <SettingsModal
          open={isSettingsOpen}
          onClose={handleSettingsClose}
          currentName={shoppingListName}
          onNameChange={handleShoppingListNameChange}
        />
    </ThemeProvider>
  );
}

export default App;