import React from 'react'
import soonImage from '../assets/coming-soon.svg';

const Settings = () => {
  return (
    <div className='settings'>
      <div className='coming-soon'>
        <h2>This page is under construction!</h2>
        <div className='coming-soon-img' style={{ backgroundImage: `url(${soonImage})` }}></div>
        <p>Our team is currently developing this feature. Stay tuned!</p>
      </div>
    </div>
  );
};

export default Settings