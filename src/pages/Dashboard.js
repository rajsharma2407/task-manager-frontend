// src/pages/Dashboard.js
import React, { useState } from 'react';
import { Button } from '@mui/material';
import CreateTaskDialog from './CreateTaskDialog';
import TaskBoard from './TaskBoard'; // Assuming you have a TaskBoard component

const Dashboard = () => {
  const [openCreateTaskDialog, setOpenCreateTaskDialog] = useState(false);

  const handleOpenCreateTaskDialog = () => {
    setOpenCreateTaskDialog(true);
  };

  const handleCloseCreateTaskDialog = () => {
    setOpenCreateTaskDialog(false);
  };
// src/pages/Dashboard.js
const handleCreateTask = async (task) => {
  try {
    const response = await fetch('https://task-manager-backend-u5xn.onrender.com/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
      credentials: 'include', // If you use session or cookie-based authentication
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }

    const newTask = await response.json();
    console.log('Task created:', newTask);

    // You may want to update your task list or state here
    handleCloseCreateTaskDialog(); // Close the dialog after creating the task
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenCreateTaskDialog}>
        Create Task
      </Button>
      <CreateTaskDialog
        open={openCreateTaskDialog}
        onClose={handleCloseCreateTaskDialog}
        onCreate={handleCreateTask}
      />
      <TaskBoard /> {/* Display your task board here */}
    </div>
  );
};

export default Dashboard;
