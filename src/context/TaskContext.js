
import React, { createContext, useState, useEffect } from 'react';
import { getTasks, createTask as addTaskService } from '../services/taskService';

const TaskContext = createContext();

const TaskProvider = ({ children, userId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };

    fetchTasks();
  }, []);






  const addTask = async (newTask) => {
    try {
      const addedTask = await addTaskService(newTask);
      if (addedTask.userId === userId) {
        setTasks(prevTasks => [...prevTasks, addedTask]);
      }
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, setTasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
