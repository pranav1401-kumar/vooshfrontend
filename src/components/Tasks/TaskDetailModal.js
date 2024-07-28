import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button,
  MenuItem,
  Box,
  Typography,
  useTheme
} from '@mui/material';
import { updateTask, deleteTask } from '../../services/taskService';
import useTasks from '../../hooks/useTasks';

const TaskDetailModal = ({ task, onClose, onSave }) => {
  const { setTasks } = useTasks();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [column, setColumn] = useState(task.column);
  const theme = useTheme();

  const handleSave = async () => {
    try {
      const updatedTask = await updateTask(task._id, { title, description, column });
      onSave(updatedTask);
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
      onClose();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };
  
  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: 16,
          boxShadow: theme.shadows[5],
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="div" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
          Task Details
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined"
          />
          <TextField
            select
            label="Status"
            fullWidth
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: theme.spacing(3) }}>
        <Button 
          onClick={handleDelete} 
          variant="contained" 
          color="error"
          sx={{ 
            borderRadius: 2,
            '&:hover': {
              backgroundColor: theme.palette.error.dark,
            },
          }}
        >
          Delete
        </Button>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{ 
            borderRadius: 2,
            marginLeft: 2,
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          color="primary"
          sx={{ 
            borderRadius: 2,
            marginLeft: 2,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetailModal;