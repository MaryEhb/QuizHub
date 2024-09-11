import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestCard = ({ test, isOwner, classroomId }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/classrooms/${classroomId}/tests/${test._id}`);
  };

  return (
    <div className={`test-card ${isOwner ? 'owner' : 'not-owner'}`}  onClick={handleCardClick} >
      <h3>{test.title}</h3>
      <p>{test.description}</p>
    </div>
  );
};

export default TestCard;