// src/pages/TaskBoard.js
import React, { useEffect, useState } from 'react';
import { Box, Typography} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { styled } from '@mui/material/styles';
import TaskDetailsDialog from './TaskDetailsDialog';

const ColumnsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  overflow: 'auto',
  height: 'calc(100vh - 64px)', // Adjust according to Navbar height
  padding: theme.spacing(2),
}));

const Column = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: '#f0f0f0',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
}));

const Task = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  margin: theme.spacing(1, 0),
  boxShadow: theme.shadows[1],
  cursor: 'pointer',
}));

export default function TaskBoard() {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });
  const [taskDetails, setTaskDetails] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('https://task-manager-backend-u5xn.onrender.com/tasks');
      const data = await response.json();
      const groupedTasks = {
        todo: [],
        inProgress: [],
        done: [],
      };
      data.forEach(task => {
        groupedTasks[task.column].push(task);
      });
      setTasks(groupedTasks);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];

    const [movedTask] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });

    try {
      await fetch(`https://task-manager-backend-u5xn.onrender.com/tasks/${movedTask.taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ column: destination.droppableId }),
      });
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const handleTaskClick = (task) => {
    setTaskDetails(task);
  };

  const handleTaskDetailsClose = () => {
    setTaskDetails(null);
  };
  const handleUpdateTask = (updatedTask) => {
    // Logic to update the task, e.g., sending it to the server
    console.log('Updated Task:', updatedTask);
    handleTaskDetailsClose();
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ColumnsContainer>
        {Object.entries(tasks).map(([columnId, columnTasks]) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <Column ref={provided.innerRef} {...provided.droppableProps}>
                <Typography variant="h6">{columnId.replace('-', ' ')}</Typography>
                {columnTasks.map((task, index) => (
                  <Draggable key={task.taskId} draggableId={task.taskId} index={index}>
                    {(provided) => (
                      <Task
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => handleTaskClick(task)}
                      >
                        <Typography variant="body1">{task.title}</Typography>
                        <Typography variant="body2">
                          {task.description.length > 150
                            ? `${task.description.slice(0, 150)}...`
                            : task.description}
                        </Typography>
                      </Task>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Column>
            )}
          </Droppable>
        ))}
      </ColumnsContainer>
      {taskDetails && (
        <TaskDetailsDialog
          open={Boolean(taskDetails)}
          onClose={handleTaskDetailsClose}
          task={taskDetails}
          onUpdate={handleUpdateTask}

        />
      )}
    </DragDropContext>
  );
}
