import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ClassroomCard from './ClassroomCard';

const RecentClassrooms = () => {
  const { user } = useAuth();
  const [recentClassrooms, setRecentClassrooms] = useState([]);
  const [shownStart, setShownStart] = useState(0);
  const [shownEnd, setShownEnd] = useState(4);

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
          {recentClassrooms.slice(shownStart, shownEnd).map((classroom, index) => (
            <ClassroomCard
              key={classroom._id || classroom.id}
              classroom={classroom}
              small={true}
              index={index}
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