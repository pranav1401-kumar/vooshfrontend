import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import { createTask } from '../../services/taskService';
import useTasks from '../../hooks/useTasks';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { setTasks } = useTasks();
  const [dueDate, setDueDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask({ title, description, column: 'todo',dueDate });
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, backgroundColor: (theme) => theme.palette.background.default }}>
      <Typography variant="h5" gutterBottom sx={{ color: (theme) => theme.palette.primary.main }}>Add New Task</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          variant="outlined"
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
        />
        <DatePicker
        label="Due Date"
        value={dueDate}
        onChange={(newValue) => setDueDate(newValue)}
        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
      />
        <Box mt={2}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            size="large"
            sx={{ 
              borderRadius: 2,
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'all 0.3s',
              },
            }}
          >
            Add Task
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TaskForm;