// src/pages/Dashboard.js
import React, { useContext } from 'react';
import TaskBoard from '../components/Tasks/TaskBoard';
import { TaskProvider } from '../context/TaskContext';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>; // Show a loading indicator while the user is being fetched
  }

  return (
    <div style={{ display: 'flex' }}>
      <TaskProvider userId={user.id}>
        <TaskBoard />
      </TaskProvider>
    </div>
  );
};

export default Dashboard;
