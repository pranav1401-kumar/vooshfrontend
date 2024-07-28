import React from 'react';
import { useDrag } from 'react-dnd';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

const TaskCard = ({ task, onClick }) => {

  
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  

  return (
    <Card 
      ref={drag} 
      onClick={onClick}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        mb: 2,
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.3s',
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>{task.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{task.description}</Typography>
        <Chip label={task.column} size="small" color={
          task.column === 'todo' ? 'info' : 
          task.column === 'in-progress' ? 'warning' : 'success'
        } />
      </CardContent>
    </Card>
  );
};

export default TaskCard;