import React, { useEffect, useState } from 'react';
import ClassroomCard from './ClassroomCard';
import { getRecentClassrooms } from '../services/classroomService';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';

const RecentClassrooms = () => {
  const [recentClassrooms, setRecentClassrooms] = useState([]);
  const [shownStart, setShownStart] = useState(0);
  const [shownEnd, setShownEnd] = useState(4);
  const [loading, setLoading] = useState(true);
  const generalMsgUpdate = useGeneralMsgUpdate();

  useEffect(() => {
    const fetchRecentClassrooms = async () => {
      try {
        const data = await getRecentClassrooms();
        setRecentClassrooms(data);
      } catch (err) {
        generalMsgUpdate('Error Fetching Recent classrooms', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentClassrooms();

  }, []);

  if (loading) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div className='recent-classrooms'>
      <h2>Recent Classrooms</h2>

      {recentClassrooms.length > 0 ? (
        <div className='classroom-list-container'>
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
        </div>
      ) : (
        <p>You have no recent classrooms.</p>
      )}
    </div>
  );
};

export default RecentClassrooms;