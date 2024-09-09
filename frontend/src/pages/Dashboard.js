import React from 'react';
import { useAuth } from '../context/AuthContext';
import DiscoverSection from '../components/DiscoverSection';

const Dashboard = () => {
  const { user } = useAuth(); // Access user data from AuthContext

  return (
    <div className='dashboard'>
      {/* <h1>Welcome, {user ? user.firstName : 'Guest'}!</h1> */}
      {/* TODO: dashboard content */}
      <DiscoverSection />
    </div>
  );
};

export default Dashboard;