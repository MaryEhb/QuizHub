import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import cardPerson from '../assets/card-person1.svg';
import cardTest from '../assets/card-test.svg';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';
import { updateRecentClassrooms } from '../services/userService';

const ClassroomCard = ({ classroom }) => {
  const navigate = useNavigate(); 
  const generalMsgUpdate = useGeneralMsgUpdate();

  const onClick = async () => {
    const classroomId = classroom._id || classroom.id; // Check for both _id and id
    if (classroomId) {
      // Update recent classrooms without waiting for it to complete
      updateRecentClassrooms(classroomId)
        .catch(error => {
          // Optionally log error or handle it if needed
          // console.error('Error updating recent classrooms:', error);
        });

      // Navigate to the classroom details page
      navigate(`/classrooms/${classroomId}`);
    } else {
      generalMsgUpdate('Classroom ID is missing.', 'error');
    }
  };

  return (
    <div 
      className="classroom-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${classroom.title}`}
    >
      <h3>{classroom.title}</h3>
      {classroom.description && <p>{classroom.description}</p>}
      <div className='counts-container'>
        <div className='counts'>
          <div className='count'>
            {classroom.testsCount ? classroom.testsCount : 0}
            <div className='locked-icon icon' style={{ backgroundImage: `url(${cardTest})` }}></div>
          </div>
          <div className='count'>
            {classroom.membersCount ? classroom.membersCount : 0}
            <div className='locked-icon icon' style={{ backgroundImage: `url(${cardPerson})` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

ClassroomCard.propTypes = {
  classroom: PropTypes.shape({
    _id: PropTypes.string, // Made optional to handle both _id and id
    id: PropTypes.string, // Include id in prop types
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    testsCount: PropTypes.number,
    membersCount: PropTypes.number
  }).isRequired
};

export default ClassroomCard;