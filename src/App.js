import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ShoppingListList from './routes/ShoppingListList';
import ShoppingListDetail from './routes/ShoppingListDetail';

const theme = createTheme();

function App() {

  const [userRole, setUserRole] = useState('Member');

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
            path="/shopping-list/:listId"
            element={<ShoppingListDetail userRole={userRole} setUserRole={setUserRole} />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;