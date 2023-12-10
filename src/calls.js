// Mock data for shopping lists
const mockShoppingLists = [
    {
      id: 1,
      name: 'MockGroceries',
      archived: false,
      owner: { id: 1, name: 'John Doe' },
      members: [{ id: 2, name: 'Jane Doe' }],
      items: [
        { id: 1, name: 'Potatoes', solved: false },
        { id: 2, name: 'Fish', solved: false },
      ],
    },
    {
      id: 2,
      name: 'MockElectronics',
      archived: true,
      owner: { id: 3, name: 'Alice Smith' },
      members: [{ id: 4, name: 'Bob Smith' }],
      items: [
        { id: 3, name: 'Laptop', solved: false },
        { id: 4, name: 'Smartphone', solved: false },
      ],
    },
  ];

// Delay simulation (network latency)
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 500));


// Mock server call functions

// Get all shopping lists
export const fetchShoppingLists = async () => {
    await simulateNetworkDelay();
  
    // Condition to use mock server
    if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      return [...mockShoppingLists];
    } else {
      // Actual server call - No backend present
    }
  };

// Get shopping list by ID
export const fetchShoppingListById = async (listId) => {
    await simulateNetworkDelay();
  
    // Condition to use mock server
    if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      // Convert listId to a number before comparison
      const shoppingList = mockShoppingLists.find(list => list.id === Number(listId));
      return shoppingList ? { ...shoppingList } : null;
    } else {
      // Actual server call - No backend present
    }
  };

// Create a new shopping list
export const createShoppingList = async (listName) => {
    await simulateNetworkDelay();
  
    // Condition to use mock server
    if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      const newList = {
        id: Date.now(),
        name: listName,
        archived: false,
        owner: { id: 1, name: 'John Doe' },
        members: [],
        items: [],
      };
      mockShoppingLists.push(newList);
      return { ...newList };
    } else {
      // Actual server call - No backend present
    }
  };

// Update the shopping list (name, members, etc.)
export const updateShoppingList = async (listId, updatedListDetails) => {
    await simulateNetworkDelay();
  
    // Condition to use mock server
    if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      const updatedLists = mockShoppingLists.map((list) => {
        if (list.id === listId) {
          return { ...list, ...updatedListDetails };
        }
        return list;
      });
  
      return updatedLists.find((list) => list.id === listId) || { message: 'Shopping list not found.' };
    } else {
      // Actual server call - No backend present
    }
  };

// Delete a shopping list
export const deleteShoppingList = async (listId) => {
    await simulateNetworkDelay();
  
    // Condition to use mock server
    if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      const index = mockShoppingLists.findIndex((list) => list.id === listId);
      if (index !== -1) {
        mockShoppingLists.splice(index, 1);
        return { message: 'Shopping list deleted successfully.' };
      }
      return { message: 'Shopping list not found.' };
    } else {
      // Actual server call - No backend present
    }
  };

// Add an item to the shopping list
export const addItemToShoppingList = async (listId, itemName) => {
    await simulateNetworkDelay();
  
    // Condition to use mock server
    if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      const listIndex = mockShoppingLists.findIndex((list) => list.id === listId);
  
      if (listIndex !== -1) {
        const newItem = { id: Date.now(), name: itemName, solved: false };
        mockShoppingLists[listIndex].items.push(newItem);
        return { ...mockShoppingLists[listIndex] };
      }
  
      return { message: 'Shopping list not found.' };
    } else {
      // Actual server call - No backend present
    }
  };

// Update an item in the shopping list (solved/unsolved)
export const updateItemInShoppingList = async (listId, itemId, updatedItemDetails) => {
    await simulateNetworkDelay();
  
    // Condition to use mock server
    if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      const updatedLists = mockShoppingLists.map((list) => {
        if (list.id === listId) {
          const updatedItems = list.items.map((item) => {
            if (item.id === itemId) {
              return { ...item, ...updatedItemDetails };
            }
            return item;
          });
          return { ...list, items: updatedItems };
        }
        return list;
      });
  
      return updatedLists.find((list) => list.id === listId) || { message: 'Shopping list not found.' };
    } else {
      // Actual server call - No backend present
    }
  };

// Delete an item from the shopping list
export const deleteItemFromShoppingList = async (listId, itemId) => {
    await simulateNetworkDelay();
  
    // Condition to use mock server
    if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      const updatedLists = mockShoppingLists.map((list) => {
        if (list.id === listId) {
          const updatedItems = list.items.filter((item) => item.id !== itemId);
          return { ...list, items: updatedItems };
        }
        return list;
      });
  
      return updatedLists.find((list) => list.id === listId) || { message: 'Shopping list not found.' };
    } else {
      // Actual server call - No backend present
    }
  };

// Get the members of a shopping list
export const getMembersOfShoppingList = async (listId) => {
    await simulateNetworkDelay();
  
    // Condition to use mock server
    if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      const list = mockShoppingLists.find((list) => list.id === listId);
  
      if (list) {
        return [...list.members];
      }
  
      return { message: 'Shopping list not found.' };
    } else {
      // Actual server call - No backend present
    }
  };

// Add a member to the shopping list
export const addMemberToShoppingList = async (listId, memberDetails) => {
    await simulateNetworkDelay();
  
    // Condition to use mock server
    if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      const list = mockShoppingLists.find((list) => list.id === listId);
  
      if (list) {
        const newMember = { id: memberDetails.id, name: memberDetails.name };
        list.members.push(newMember);
        return [...list.members];
      }
  
      return { message: 'Shopping list not found.' };
    } else {
      // Actual server call - No backend present
    }
  };

// Remove a member from a shopping list
export const removeMemberFromShoppingList = async (listId, memberId) => {
    await simulateNetworkDelay();
  
    // Condition to use mock server
    if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      const list = mockShoppingLists.find((list) => list.id === listId);
  
      if (list) {
        const updatedMembers = list.members.filter((member) => member.id !== memberId);
        list.members = updatedMembers;
        return [...list.members];
      }
  
      return { message: 'Shopping list not found.' };
    } else {
      // Actual server call - No backend present
    }
  };

// Leave the shopping list (Member only)
export const leaveShoppingList = async (listId, memberId) => {
    await simulateNetworkDelay();
  
    // Condition to use mock server
    if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      const list = mockShoppingLists.find((list) => list.id === listId);
  
      if (list) {
        const updatedMembers = list.members.filter((member) => member.id !== memberId);
        list.members = updatedMembers;
        return { message: 'Successfully left the shopping list.' };
      }
  
      return { message: 'Shopping list not found.' };
    } else {
      // Actual server call - No backend present
    }
  };