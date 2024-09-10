import React from 'react';
import { useParams } from 'react-router-dom';
import DiscoverSection from '../components/DiscoverSection';

const Dashboard = () => {
  const { page } = useParams();
  const currentPage = parseInt(page) || 1; // Default to page 1 if no page is specified

  return (
    <div className='dashboard'>
      {/* <h1>Welcome, {user ? user.firstName : 'Guest'}!</h1> */}
      {/* TODO: dashboard content */}
      <DiscoverSection initialPage={currentPage} />
    </div>
  );
};

export default Dashboard;