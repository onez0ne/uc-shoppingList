import React, { useState } from 'react';
import Header from '../components/Header';
import ShoppingTiles from '../components/ShoppingTiles';
import FloatingButton from '../components/FloatingButton';
import AddListModal from '../components/AddListModal';
import ConfirmationModal from '../components/ConfirmationModal';

const ShoppingListList = () => {
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = React.useState(false);
  const [listToDelete, setListToDelete] = React.useState(null);
  const [showArchivedLists, setShowArchivedLists] = useState(false);
  const [shoppingLists, setShoppingLists] = useState([
    { id: 1, name: 'Groceries', archived: false },
    { id: 2, name: 'Electronics', archived: false },
    { id: 3, name: 'Clothing', archived: true },
    { id: 4, name: 'Books', archived: false },
  ]);

  const openAddListModal = () => { // Open the Add List Modal
    setIsAddListModalOpen(true);
  };

  const closeAddListModal = () => { // Close the Add List Modal
    setIsAddListModalOpen(false);
  };

  const handleAddList = (newListName) => { // Add a List
    const newListWithId = { id: Date.now(), name: newListName, archived: false };
    const updatedLists = [...shoppingLists, newListWithId];
    setShoppingLists(updatedLists);
    closeAddListModal();
  };

  const openDeleteConfirmation = (list) => {
    setListToDelete(list);
    setIsDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setListToDelete(null);
    setIsDeleteConfirmationOpen(false);
  };

  const onListDelete = (listId) => {
    const listIndex = shoppingLists.findIndex((list) => list.id === listId);
    if (listIndex !== -1) {
      const updatedLists = [...shoppingLists.slice(0, listIndex), ...shoppingLists.slice(listIndex + 1)];
      setShoppingLists(updatedLists);
    }
  };

  const confirmDelete = () => {
    if (listToDelete) {
      onListDelete(listToDelete.id);
      closeDeleteConfirmation();
    }
  };

  const onListArchive = (listId) => {
    const listIndex = shoppingLists.findIndex((list) => list.id === listId);
    if (listIndex !== -1) {
      const updatedLists = [...shoppingLists];
      updatedLists[listIndex] = { ...updatedLists[listIndex], archived: !updatedLists[listIndex].archived };
      setShoppingLists(updatedLists);
    }
  };

  const onFilterToggle = () => {
    // Toggle the state to show/hide archived lists
    setShowArchivedLists(!showArchivedLists);
  };

  return (
    <>
      <Header title="My Shopping Lists"
      showSettingsButton={false}
      toggleLabel="Show Archived Lists"
      onFilterToggle={onFilterToggle}
      showSolvedItems={showArchivedLists}
      />

      <div style={{ width: '80%', margin: '20px auto' }}>
        <ShoppingTiles
          lists={shoppingLists.filter((list) => showArchivedLists || !list.archived)}
          onListDelete={openDeleteConfirmation}
          onListArchive={onListArchive}
        />
      </div>

      <FloatingButton onClick={openAddListModal} />
      <AddListModal open={isAddListModalOpen} onClose={closeAddListModal} onAddList={handleAddList} />
      <ConfirmationModal
        open={isDeleteConfirmationOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete the shopping list "${listToDelete?.name}"?`}
      />
    </>
  );
};

export default ShoppingListList;
