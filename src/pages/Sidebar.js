import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import { Home, Payment, Business, Restaurant, TwoWheeler, Settings, Logout } from '@mui/icons-material';
import ThemeToggle from '../theme/ThemeToggle';
import { Link } from 'react-router-dom';

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  const menuItems = [
    { text: 'Payment', icon: <Payment />, path: '/' },
    { text: 'Company Dashboard', icon: <Business />, path: '/payment' },
    { text: 'Restaurant Dashboard', icon: <Restaurant />, path: '/restaurant' },
    { text: 'Rider Dashboard', icon: <TwoWheeler />, path: '/rider' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          backgroundColor: darkMode ? '#0B2B40' : '#1976d2',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box>

        <Box display="flex" alignItems="center" justifyContent="space-between" p={2}>
          <Typography variant="h6" noWrap>
            FoodDash
          </Typography>
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </Box>


        <List>
          {menuItems.map((item, index) => (
            <ListItem 
              button 
              key={index}
              component={Link}
              to={item.path}
              sx={{
                color: 'white',         
                textDecoration: 'none', 
                '&:hover': {
                  backgroundColor: darkMode ? '#154360' : '#1565c0', 
                }
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Bottom logout */}
      <List>
        <ListItem button sx={{ color: 'white', textDecoration: 'none' }}>
          <ListItemIcon sx={{ color: 'white' }}>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
