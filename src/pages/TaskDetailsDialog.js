// src/pages/TaskDetailsDialog.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const TaskDetailsDialog = ({ open, onClose, task, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
    }
  }, [task]);

  const handleUpdate = () => {
    if (task) {
      const updatedTask = { ...task, title, description };
      onUpdate(updatedTask);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetailsDialog;
