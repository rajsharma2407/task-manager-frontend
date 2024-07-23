import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

function TaskList({ tasks }) {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.taskId}>
          <ListItemText primary={task.title} secondary={task.description} />
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;
