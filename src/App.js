// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import ShoppingListList from './routes/ShoppingListList';
import ShoppingListDetail from './routes/ShoppingListDetail';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<ShoppingListList />} />
          <Route path="/shopping-list/:id" element={<ShoppingListDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;