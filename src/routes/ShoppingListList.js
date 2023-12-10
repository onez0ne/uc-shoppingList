import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ShoppingTiles from '../components/ShoppingTiles';
import FloatingButton from '../components/FloatingButton';
import AddListModal from '../components/AddListModal';
import ConfirmationModal from '../components/ConfirmationModal';
import {
  fetchShoppingLists,
  createShoppingList,
  updateShoppingList,
  deleteShoppingList,
} from '../calls';

const ShoppingListList = ({ userRole, setUserRole }) => {
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = React.useState(false);
  const [listToDelete, setListToDelete] = React.useState(null);
  const [showArchivedLists, setShowArchivedLists] = useState(false);
  const [shoppingLists, setShoppingLists] = useState([]); // Fetch shopping lists from mock data

  useEffect(() => {
    const fetchData = async () => {
      const lists = await fetchShoppingLists();
      setShoppingLists(lists);
    };
  
    fetchData();
  }, []);

  const openAddListModal = () => { // Open the Add List Modal
    setIsAddListModalOpen(true);
  };

  const closeAddListModal = () => { // Close the Add List Modal
    setIsAddListModalOpen(false);
  };

  const handleAddList = async (newListName) => { // Adds the list via a CALL
    const newList = await createShoppingList(newListName);
    setShoppingLists((prevLists) => [...prevLists, newList]);
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

  const onListDelete = async (listId) => { // Deletes the list via a CALL
    await deleteShoppingList(listId);
    setShoppingLists((prevLists) => prevLists.filter((list) => list.id !== listId));
  };

  const confirmDelete = () => {
    if (listToDelete) {
      onListDelete(listToDelete.id);
      closeDeleteConfirmation();
    }
  };

  const onListArchive = async (listId) => {
    const listToUpdate = shoppingLists.find((list) => list.id === listId);
  
    if (listToUpdate) {
      // Check the current archived status and toggle it
      const updatedList = await updateShoppingList(listId, { archived: !listToUpdate.archived });
      
      // Update the state with the modified list
      setShoppingLists((prevLists) =>
        prevLists.map((list) => (list.id === listId ? updatedList : list))
      );
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
      userRole={userRole}
      setUserRole={setUserRole} 
      />

      <div style={{ width: '80%', margin: '20px auto' }}>
        <ShoppingTiles
          lists={shoppingLists.filter((list) => showArchivedLists || !list.archived)}
          onListDelete={openDeleteConfirmation}
          onListArchive={onListArchive}
          userRole={userRole}
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
