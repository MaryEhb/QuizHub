import React from 'react';
import cardPerson from '../assets/card-person1.svg';
import cardTest from '../assets/card-test.svg';

const ClassroomCard = ({ classroom, onClick }) => {
  return (
    <div className="classroom-card" onClick={() => onClick(classroom.id)}>
      <h3>{classroom.title}</h3>
      {classroom.description && <p>{classroom.description}</p>}
      <div className='counts-container'>
        <div className='counts'>
            <p>{classroom.testsCount? classroom.testsCount : 0}<div className='locked-icon icon' style={{ backgroundImage: `url(${cardTest})` }}></div></p>
            <p>{classroom.membersCount? classroom.membersCount : 0}<div className='locked-icon icon' style={{ backgroundImage: `url(${cardPerson})` }}></div></p>
        </div>
      </div>
    </div>
  );
};

export default ClassroomCard;