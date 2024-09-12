import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import cardPerson from '../assets/card-person1.svg';
import cardTest from '../assets/card-test.svg';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';
import lockIcon from '../assets/lock.svg';

const ClassroomCard = ({ classroom, small=false, index=0 }) => {
  const navigate = useNavigate(); 
  const generalMsgUpdate = useGeneralMsgUpdate();

  // Define your extended colors array here
  const colors = [
    '#8FFFA9', // $color-mint-green
    '#FE5D32', // $color-tangerine
    '#FFF461', // $color-sunshine-yellow
    '#FFE499', // $color-light-sunshine-yellow
    '#C53EFF',
    '#C0FF8F',
    '#FFB53E',
    '#8FECFF',
  ];

  // Function to get color based on index
const getColorByIndex = (index) => {
  return colors[index % colors.length];
};

  const onClick = async () => {
    const classroomId = classroom._id || classroom.id; // Check for both _id and id
    if (classroomId) {
      // Navigate to the classroom details page
      navigate(`/classrooms/${classroomId}`);
    } else {
      generalMsgUpdate('Classroom ID is missing.', 'error');
    }
  };

  return (
    <div 
      className={`classroom-card ${small && 'small'}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${classroom.title}`}
    >
      <h3>{classroom.title}</h3>
      {!small && classroom.description && <p>{classroom.description}</p>}
      <div className='counts-container'>
        <div className='counts' style={{ backgroundColor: getColorByIndex(index) }}>
          <div className='count'>
            {classroom.testsCount ? classroom.testsCount : 0}
            <div className='locked-icon icon' style={{ backgroundImage: `url(${cardTest})` }}></div>
          </div>
          <div className='count'>
            {classroom.membersCount ? classroom.membersCount : 0}
            <div className='locked-icon icon' style={{ backgroundImage: `url(${cardPerson})` }}></div>
          </div>
        </div>
        {!classroom.isPublic && <div className='icon lock-icon' style={{ backgroundImage: `url(${lockIcon})` }}></div>}
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