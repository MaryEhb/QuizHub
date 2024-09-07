import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
// import loadingAnimation from '../assets/sandwatch.json';
import loadingAnimation from '../assets/cups.json';
// import loadingAnimation from '../assets/yellowLoop.json';

// TODO: decide which loading animation to be used and change colors if neccessary 

const Loading = () => {
  return (
    <div className='loading-container'>
      <Player
        autoplay
        loop
        src={loadingAnimation}
        style={{ width: '300px' }}
      />
      <p>Loading</p>
    </div>
  );
};

export default Loading;