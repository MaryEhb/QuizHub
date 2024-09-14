import React from 'react';
import { useNavigate } from 'react-router-dom';
import editImg from '../assets/edit.svg';
import viewImg from '../assets/vision.png';

const TestCard = ({ test, isOwner, classroomId}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/classrooms/${classroomId}/tests/${test._id}`);
  };

  return (
    <div className={`test-card ${isOwner ? 'owner' : 'not-owner'}`}  onClick={handleCardClick} >
      <div className='icon-container'>
        {isOwner? (
          <div className='icon' style={{ backgroundImage: `url(${test.isPublished? viewImg : editImg})` }}></div>
        ) : (
          <div>{test.submitScore !== undefined? test.submitScore : '_'}/{test.maxScore? test.maxScore : 0}</div>
        )}
      </div>
      <h3>{test.title}</h3>
      <div className='test-info'>
        <p>Start Date: <span>{test.startTime? new Date(test.startTime).toLocaleDateString() : '_'}</span></p>
        <p>End Date: <span>{test.endTime? new Date(test.endTime).toLocaleDateString() : '_'}</span></p>
        {!isOwner && (<p>Last Submit: <span>{test.submitTime? new Date(test.submitTime).toLocaleDateString() : '_'}</span></p>)}
      </div>
    </div>
  );
};

export default TestCard;