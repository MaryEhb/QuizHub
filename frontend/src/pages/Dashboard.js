import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth(); // Access user data from AuthContext

  return (
    <div>
      <h1>Welcome, {user ? user.firstName : 'Guest'}!</h1>
      {/* TODO: dashboard content */}
    </div>
  );
};

export default Dashboard;