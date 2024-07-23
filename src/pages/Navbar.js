// src/pages/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('email');

  return (
    <AppBar
      position="fixed"
      sx={{
        width: '200px',
        left: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: theme => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {isLoggedIn ? (
          <>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
            <ListItem button component={Link} to="/tasks">
              <ListItemText primary="Tasks" />
            </ListItem>
            <ListItem button component={Link} to="/profile">
              <ListItemText primary="Profile" />
            </ListItem>
          </>
        ) : (
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </AppBar>
  );
};

export default Navbar;
