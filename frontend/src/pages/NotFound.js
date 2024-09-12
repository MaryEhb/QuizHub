import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundImage from '../assets/404.svg';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  return (
    <div className="not-found">
      <img src={NotFoundImage} alt="Page Not Found" className="not-found-image" />
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button className='btn btn-success' onClick={handleGoHome}>Go to Dashboard</button>
    </div>
  );
};

export default NotFound;