import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ClassroomCard from './ClassroomCard';

const RecentClassrooms = () => {
  const { user } = useAuth();
  const [recentClassrooms, setRecentClassrooms] = useState([]);

  useEffect(() => {
    if (user && user.recentClassrooms) {
      setRecentClassrooms(user.recentClassrooms);
    } else {
      setRecentClassrooms([]);
    }
  }, [user]);

  return (
    <div className='recent-classrooms'>
      <h2>Recent Classrooms</h2>
      {recentClassrooms.length > 0 ? (
        <div className='classroom-list'>
          {recentClassrooms.map(classroom => (
            <ClassroomCard
              key={classroom._id || classroom.id}
              classroom={classroom}
            />
          ))}
        </div>
      ) : (
        <p>You have no recent classrooms.</p>
      )}
    </div>
  );
};

export default RecentClassrooms;