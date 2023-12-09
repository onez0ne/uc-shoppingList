// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import ShoppingListList from './routes/ShoppingListList';
import ShoppingListDetail from './routes/ShoppingListDetail';

const theme = createTheme();

function App() {

  const [userRole, setUserRole] = useState('Member');

  const setUserRoleWrapper = (newRole) => {
    setUserRole(newRole);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route 
            path="/"
            element={<ShoppingListList userRole={userRole} setUserRole={setUserRole} />}
          />
          <Route 
            path="/shopping-list/:id"
            element={<ShoppingListDetail userRole={userRole} setUserRole={setUserRole} />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;