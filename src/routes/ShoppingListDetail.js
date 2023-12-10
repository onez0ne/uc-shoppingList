import React, { useState } from 'react';
import Header from '../components/Header';
import SettingsModal from '../components/SettingsModal';
import ShoppingList from '../components/ShoppingList';
import AddItemModal from '../components/AddItemModal';
import FloatingButton from '../components/FloatingButton';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ShoppingListDetail({ userRole, setUserRole }) {
  const [showSolvedItems, setShowSolvedItems] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [shoppingList, setShoppingList] = useState({
    id: 1,
    name: 'My Shopping List',
    owner: 1, // User ID of the owner
    members: [1, 2], // Array of user IDs of the members
    items: [
      { id: 1, name: 'Potatoes', solved: false },
      { id: 2, name: 'Fish', solved: false },
      { id: 3, name: 'Bread', solved: false },
      { id: 4, name: 'Carrots', solved: false },
    ],
  });

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
  };

  const handleShoppingListNameChange = (newName) => {
    setShoppingList((prevList) => ({ ...prevList, name: newName }));
  };

  const handleFilterToggle = () => {
    setShowSolvedItems(!showSolvedItems);
  };

  const handleItemToggle = (clickedItem) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.map((item) =>
        item.id === clickedItem.id ? { ...item, solved: !item.solved } : item
      ),
    }));
  };

  const handleItemDelete = (itemId) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: prevList.items.filter((item) => item.id !== itemId),
    }));
  };

  const openAddItemModal = () => {
    setIsAddItemModalOpen(true);
  };

  const closeAddItemModal = () => {
    setIsAddItemModalOpen(false);
  };

  const handleAddItem = (newItem) => {
    setShoppingList((prevList) => ({
      ...prevList,
      items: [
        ...prevList.items,
        { id: Date.now(), name: newItem, solved: false },
      ],
    }));
    setIsAddItemModalOpen(false);
  };

  const navigate = useNavigate();

  return (
    <>
      <Header
        title={shoppingList.name}
        showSettingsButton={true}
        onSettingsClick={handleSettingsClick}
        onFilterToggle={handleFilterToggle}
        showSolvedItems={showSolvedItems}
        navigate={navigate}
        showBackButton={true}
        userRole={userRole}
        setUserRole={setUserRole}
      />
      <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
        <ShoppingList
          items={shoppingList.items}
          onItemToggle={handleItemToggle}
          onItemDelete={handleItemDelete}
          showSolvedItems={showSolvedItems}
        />
      </Container>
      <FloatingButton onClick={openAddItemModal} />

      <AddItemModal
        open={isAddItemModalOpen}
        onClose={closeAddItemModal}
        onAddItem={handleAddItem}
      />
      
      <SettingsModal
        open={isSettingsOpen}
        onClose={handleSettingsClose}
        currentName={shoppingList.name}
        onNameChange={handleShoppingListNameChange}
        userRole={userRole}
      />
    </>
  );
}

export default ShoppingListDetail;