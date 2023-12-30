// Mock data for Users
const mockUsers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Alice Smith' },
  { id: 4, name: 'Bob Smith' },
];

// Mock data for shopping lists
const mockShoppingLists = [
  {
    id: 1,
    name: 'MockGroceries',
    archived: false,
    owner: 1, // Referencing user by ID
    members: [2], // Referencing members by IDs
    items: [
      { id: 1, name: 'Potatoes', solved: false },
      { id: 2, name: 'Fish', solved: false },
    ],
  },
  {
    id: 2,
    name: 'MockElectronics',
    archived: false,
    owner: 3, // Referencing user by ID
    members: [4], // Referencing members by IDs
    items: [
      { id: 3, name: 'Laptop', solved: false },
      { id: 4, name: 'Smartphone', solved: false },
    ],
  },
  {
    id: 3,
    name: 'MockHygiene',
    archived: true,
    owner: 2, // Referencing user by ID
    members: [4, 1], // Referencing members by IDs
    items: [
      { id: 5, name: 'Shampoo', solved: false },
      { id: 6, name: 'Shower gel', solved: false },
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

      if (shoppingList) {
          // Fetch owner details
          const owner = mockUsers.find(user => user.id === shoppingList.owner);

          // Fetch member details
          const members = shoppingList.members.map(memberId => 
              mockUsers.find(user => user.id === memberId)
          );

          // Return the shopping list with owner and members details
          return {
              ...shoppingList,
              owner: owner,
              members: members
          };
      }

      return null;
  } else {
      // Actual server call - No backend present
  }
};

// Create a new shopping list
export const createShoppingList = async (listName, ownerId = 1) => {
  await simulateNetworkDelay();

  // Condition to use mock server
  if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      const newList = {
          id: Date.now(),
          name: listName,
          archived: false,
          owner: ownerId, // Owner's ID, default set to 1 for mockup
          members: [],
          items: []
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
        const memberDetails = list.members.map(memberId => {
            return mockUsers.find(user => user.id === memberId);
        });
        return memberDetails.filter(Boolean);
    }

    return { message: 'Shopping list not found.' };
  } else {
    // Actual server call - No backend present
  }
};

// Add a member to the shopping list
export const addMemberToShoppingList = async (listId, memberId) => {
  await simulateNetworkDelay();

  if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      const list = mockShoppingLists.find(list => list.id === listId);

      if (list && !list.members.includes(memberId)) {
          list.members.push(memberId);
          return list.members.map(memberId => mockUsers.find(user => user.id === memberId));
      }

      return { message: 'Shopping list not found or member already in list.' };
  } else {
      // Actual server call - No backend present
  }
};

// Remove a member from a shopping list
export const removeMemberFromShoppingList = async (listId, memberId) => {
  await simulateNetworkDelay();

  // Condition to use mock server 
  if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      const list = mockShoppingLists.find(list => list.id === listId);

      if (list) {
          list.members = list.members.filter(id => id !== memberId);
          return list.members.map(memberId => mockUsers.find(user => user.id === memberId));
      }

      return { message: 'Shopping list not found.' };
  } else {
      // Actual server call - No backend present
  }
};

// Leave the shopping list (Member only)
export const leaveShoppingList = async (listId, memberId) => {
  await simulateNetworkDelay();

  if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {
      const list = mockShoppingLists.find(list => list.id === listId);

      if (list && list.members.includes(memberId)) {
          list.members = list.members.filter(id => id !== memberId);
          return { message: 'Successfully left the shopping list.' };
      }

      return { message: 'Shopping list not found or member not in list.' };
  } else {
      // Actual server call - No backend present
  }
};

// Get user by ID
export const fetchUserById = async (userId) => {
  await simulateNetworkDelay();

  if (process.env.REACT_APP_USE_MOCK_SERVER === 'true') {

    const numericUserId = typeof userId === 'number' ? userId : null;

    if (numericUserId) {
      const user = mockUsers.find(user => user.id === numericUserId);
      return user ? { ...user } : null;
    }
  } else {
    // Actual server call - No backend present
  }
};