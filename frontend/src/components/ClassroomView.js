import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { IoIosArrowBack } from "react-icons/io";
import lock from '../assets/lock.svg';
import request from '../assets/request.svg';
import person from '../assets/person.svg';

const ClassroomView = ({ classroomId, onClose, details }) => {
  const [classroomDetails, setClassroomDetails] = useState(details);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('tests');

  // Check if classroomDetails is null or undefined
  if (!classroomDetails) {
    return (
      <div className="classroom-details">
        <button className="close-button" onClick={onClose}>Close</button> {/* Close Button */}
        <p>Loading classroom details...</p>
      </div>
    );
  }

  // Check if the user is the owner of the classroom
  const isOwner = classroomDetails.owner && classroomDetails.owner._id === user._id;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="classroom-details">
      <button className="close-button" onClick={onClose}><IoIosArrowBack /></button> {/* Close Button */}
      
      <div className='title-container'>
        <div className='title'>
        <h2>{classroomDetails.title}</h2>
        {!classroomDetails.isPublic && <div className='locked-icon icon' style={{ backgroundImage: `url(${lock})` }}></div>}
        </div>
        {isOwner && (
          <div className='title-owner'>
            <div className='option'>
              <p className={`${classroomDetails.members.length > 0 ? 'number' : ''}`}>{classroomDetails.members.length}</p>
              <div className='person-icon icon' style={{ backgroundImage: `url(${person})` }}></div>
            </div>
            { !classroomDetails.isPublic && 
            <div className='option'>
              <p className={`${classroomDetails.enrollRequests.length > 0 ? 'number' : ''}`}>{classroomDetails.enrollRequests.length}</p>
              <div className='request-icon icon' style={{ backgroundImage: `url(${request})` }}></div>
            </div>
            }
          </div>
        )}

      </div>

      <p>{classroomDetails.description}</p>

          {/* Tabs for Tests, Leaderboard, and Settings */}
          <div className="tabs">
            <div
              className={`tab ${activeTab === 'tests' ? 'active' : ''}`}
              onClick={() => handleTabClick('tests')}
            >
              Tests
            </div>
            <div
              className={`tab ${activeTab === 'leaderboard' ? 'active' : ''}`}
              onClick={() => handleTabClick('leaderboard')}
            >
              Leaderboard
            </div>
            {isOwner && (
              <div
                className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => handleTabClick('settings')}
              >
                Settings
              </div>
            )}
          </div>

          {/* Content Based on Active Tab */}
          <div className="tab-content">
            {activeTab === 'tests' && (
              <div className="tests-list">
                {classroomDetails.tests.length > 0 ? (
                  <ul>
                    {classroomDetails.tests.map((test) => (
                      <li key={test._id}>{test.title}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No tests available</p>
                )}
              </div>
            )}
            {activeTab === 'leaderboard' && (
              <p>Leaderboard coming soon...</p>
            )}

            {activeTab === 'settings' && (
              <p>Settings are still under development...</p>
            )}
          </div>
    </div>
  );
};

export default ClassroomView;