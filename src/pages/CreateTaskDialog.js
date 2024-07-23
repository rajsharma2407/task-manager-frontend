// src/components/CreateTaskDialog.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

export default function CreateTaskDialog({ open, onClose, onSave }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSave = () => {
    if (taskTitle.trim()) {
      onSave({ title: taskTitle, description: taskDescription });
      setTaskTitle('');
      setTaskDescription('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Title"
          type="text"
          fullWidth
          variant="outlined"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Task Description"
          type="text"
          fullWidth
          variant="outlined"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
