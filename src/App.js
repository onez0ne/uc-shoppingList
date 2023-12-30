import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ShoppingListList from './routes/ShoppingListList';
import ShoppingListDetail from './routes/ShoppingListDetail';

// Define Themes for Dark/Light Mode
const lightTheme = createTheme({ // Light Mode
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({ // Dark Mode
  palette: {
    mode: 'dark',
  },
});


function App() {
  const [themeMode, setThemeMode] = useState('light'); // State to manage Dark/Light mode

  // useMemo will recompute the theme object only if themeMode changes
  const theme = useMemo(() => {
    return themeMode === 'light' ? lightTheme : darkTheme;
  }, [themeMode]);

  // Function to toggle the Dark/Light mode
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const [userRole, setUserRole] = useState('Member');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route 
            path="/"
            element={<ShoppingListList themeToggler={toggleTheme} themeMode={themeMode} userRole={userRole} setUserRole={setUserRole} />}
          />
          <Route 
            path="/shopping-list/:listId"
            element={<ShoppingListDetail themeToggler={toggleTheme} themeMode={themeMode} userRole={userRole} setUserRole={setUserRole} />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;