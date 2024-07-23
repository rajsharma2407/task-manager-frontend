// src/pages/Dashboard.js
import React, {useState} from 'react';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './Navbar';
import TaskBoard from './TaskBoard';

const theme = createTheme();

const Dashboard = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openCreateTaskDialog = () => {
    setDialogOpen(true);
  };

  const closeCreateTaskDialog = () => {
    setDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Navbar onOpenCreateTaskDialog={openCreateTaskDialog} />
        <Box sx={{ flexGrow: 1, marginLeft: '200px', padding: '20px' }}>
          <TaskBoard openCreateTaskDialog={dialogOpen} closeCreateTaskDialog={closeCreateTaskDialog} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
