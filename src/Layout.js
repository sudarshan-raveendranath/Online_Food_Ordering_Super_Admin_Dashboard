// src/Layout.js
import React, { useState } from 'react';
import { Box } from '@mui/material';
import Sidebar from './pages/Sidebar'; // or correct this path if Sidebar is in components folder

const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar on the left */}
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main content on the right */}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Content area */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>

    </Box>
  );
};

export default Layout;
