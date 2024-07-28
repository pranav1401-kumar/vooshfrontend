import React from 'react';
import Profile from '../components/Users/Profile';
import Sidebar from '../components/Layout/Sidebar';

const ProfilePage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <Profile />
    </div>
  );
};

export default ProfilePage;
