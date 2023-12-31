import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SettingsModal from '../components/SettingsModal';
import ShoppingList from '../components/ShoppingList';
import AddItemModal from '../components/AddItemModal';
import FloatingButton from '../components/FloatingButton';
import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchShoppingListById, updateShoppingList, updateItemInShoppingList, deleteItemFromShoppingList, fetchUserById } from '../calls';
import { useTranslation } from 'react-i18next';

function ShoppingListDetail({ userRole, setUserRole, themeToggler, themeMode }) {
  const { t } = useTranslation();
  
  const [showSolvedItems, setShowSolvedItems] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [shoppingList, setShoppingList] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use the useParams hook to get the id from the route
  const { listId } = useParams();

  // Fetch shopping list data on component mount
  useEffect(() => {
    const fetchData = async () => {
      if (listId !== null) {
        try {
          const listData = await fetchShoppingListById(listId);
          setShoppingList(listData);
  
          // Ensure ownerId is a number before fetching user details
          let ownerId = listData?.owner;
          if (typeof ownerId === 'object' && ownerId !== null) {
            ownerId = ownerId.id;
          }
          if (typeof ownerId === 'number') {
            const ownerData = await fetchUserById(ownerId);
            setOwner(ownerData);
          }
  
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [listId]);

  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
  };

  const handleShoppingListUpdate = async (updatedDetails) => {
    if (shoppingList) {
      const updatedList = await updateShoppingList(shoppingList.id, updatedDetails);
      setShoppingList(updatedList);
    }
  };

  const handleFilterToggle = () => {
    setShowSolvedItems(!showSolvedItems);
  };

  const handleItemToggle = async (clickedItem) => {
    if (shoppingList && Array.isArray(shoppingList.items)) {
      // Perform the toggle for the clicked item
      const updatedItems = shoppingList.items.map((item) => {
        if (item.id === clickedItem.id) {
          return { ...item, solved: !item.solved };
        }
        return item;
      });
  
      // Sort the updated items
      const sortedItems = [...updatedItems].sort((a, b) => {
        if (a.solved && !b.solved) {
          return 1;
        } else if (!a.solved && b.solved) {
          return -1;
        }
        return 0;
      });
  
      // Update the shopping list with the sorted items
      setShoppingList((prevList) => ({
        ...prevList,
        items: sortedItems,
      }));
    }
  };

  const handleItemDelete = (itemId) => {
    if (shoppingList && Array.isArray(shoppingList.items)) {
      // Filter out the item to be deleted
      const updatedItems = shoppingList.items.filter((item) => item.id !== itemId);
  
      // Update the shopping list with the new items array
      setShoppingList((prevList) => ({
        ...prevList,
        items: updatedItems,
      }));
    }
  };

  const openAddItemModal = () => {
    setIsAddItemModalOpen(true);
  };

  const closeAddItemModal = () => {
    setIsAddItemModalOpen(false);
  };

  const handleAddItem = (newItem) => {
    if (shoppingList) {
      const updatedItems = shoppingList.items ? [...shoppingList.items] : [];
  
      const newAddedItem = { id: Date.now(), name: newItem, solved: false };
  
      setShoppingList((prevList) => {
        const newList = {
          ...prevList,
          items: prevList.items ? [...prevList.items, newAddedItem] : [newAddedItem],
        };
        return newList;
      });
  
      setIsAddItemModalOpen(false);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <p>{t('loading')}</p> //TODO: Make the loading prettier (maybe skeleton?)
      ) : (
        <>
          <Header
            title={shoppingList ? shoppingList.name : t('loading')}
            showSettingsButton={true}
            onSettingsClick={handleSettingsClick}
            onFilterToggle={handleFilterToggle}
            showSolvedItems={showSolvedItems}
            navigate={navigate}
            showBackButton={true}
            themeToggler={themeToggler} 
            themeMode={themeMode}
            userRole={userRole}
            setUserRole={setUserRole}
          />
          <Container component="main" maxWidth={{ xs: '100%', sm: 'sm' }} sx={{ mt: 4 }}>
            <ShoppingList
              items={shoppingList ? shoppingList.items : []}
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
            ownerId={shoppingList ? shoppingList.owner : null}
            ownerName={owner ? owner.name : 'Loading...'}
            currentName={shoppingList ? shoppingList.name : 'Loading...'}
            onNameChange={(newName) => handleShoppingListUpdate({ name: newName })}
            userRole={userRole}
          />
        </>
      )}
    </>
  );
}

export default ShoppingListDetail;