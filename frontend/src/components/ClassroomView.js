import React, { useState } from 'react';
import { useAuth, useAuthUpdate } from '../context/AuthContext';
import { IoIosArrowBack } from "react-icons/io";
import lock from '../assets/lock.svg';
import request from '../assets/request.svg';
import person from '../assets/person.svg';
import EnrollmentRequests from './EnrollmentRequest';
import { sendEnrollmentRequest, sendUnenrollmentRequest } from '../services/classroomService';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';
import TestCard from './TestCard';
import { useNavigate } from 'react-router-dom';

const ClassroomView = ({ classroomId, onClose, details }) => {
  const [classroomDetails, setClassroomDetails] = useState(details);
  const { user } = useAuth();
  const setUser = useAuthUpdate();
  const [activeTab, setActiveTab] = useState('tests');
  const [showRequests, setShowRequests] = useState(false); 

  const updateGeneralMsg = useGeneralMsgUpdate();
  const navigate = useNavigate();

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

  // Check if the user is enrolled in the classroom
  const isEnrolled = classroomDetails.members.some(member => member._id === user._id);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleRequests = () => {
    setShowRequests(!showRequests);
  };

  const updateRequests = (updatedRequests) => {
    setClassroomDetails(prevDetails => ({
      ...prevDetails,
      enrollRequests: updatedRequests
    }));
  };

  const updateMembers = (user) => {
    setClassroomDetails(prevDetails => ({
      ...prevDetails,
      members: [...prevDetails.members, {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName
      }]
    }));
  };

  const handleEnroll = async () => {
    try {
      await sendEnrollmentRequest(classroomId);
      setUser(prevUser => ({
        ...prevUser,
        enrolledClassrooms: [
          ...prevUser.enrolledClassrooms,
          {
            id: classroomId,
            title: classroomDetails.title,
            description: classroomDetails.description,
            isPublic: classroomDetails.isPublic,
            membersCount: (classroomDetails.membersCount + 1),
            testsCount: classroomDetails.testsCount,
            maxScore: classroomDetails.maxScore
          }
        ]
      }));  
      setClassroomDetails(prevDetails => ({
        ...prevDetails,
        membersCount: classroomDetails.membersCount + 1,
        members: [...prevDetails.members, {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName
        }]
      }));
      updateGeneralMsg('Enrolled successfully', 'success');
    } catch (error) {
      console.log(error.message)
      updateGeneralMsg('Failed to send enrollment request', 'error');
    }
  };

  const handleUnenroll = async () => {
    try {
      await sendUnenrollmentRequest(classroomId);
      setUser(prevUser => ({
        ...prevUser,
        enrolledClassrooms: prevUser.enrolledClassrooms.filter(
          classroom => classroom.id !== classroomId
        )
      }));
  
      setClassroomDetails(prevDetails => ({
        ...prevDetails,
        members: prevDetails.members.filter(member => member._id !== user._id)
      }));
      onClose();
      updateGeneralMsg('Successfully unenrolled from classroom', 'success');
    } catch (error) {
      updateGeneralMsg('Failed to send unenrollment request', 'error');
    }
  };

  const handleUnenrollOthers = async (memberId) => {
    try {
      await sendUnenrollmentRequest(classroomId, memberId);
      setClassroomDetails(prevDetails => ({
        ...prevDetails,
        members: prevDetails.members.filter(member => member._id !== memberId)
      }));

      updateGeneralMsg('Successfully unenroll member from classroom', 'success');
    } catch (error) {
      updateGeneralMsg('Failed to unenroll member from classroom', 'error');
    }
  }

  const handleCreateTest = () => {
    navigate(`/classrooms/${classroomDetails._id}/create-test`);
  }

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
            <div className='option' onClick={toggleRequests}>
              <p className={`${classroomDetails.enrollRequests.length > 0 ? 'number' : ''}`}>{classroomDetails.enrollRequests.length}</p>
              <div className='request-icon icon' style={{ backgroundImage: `url(${request})` }}></div>
            </div>
            }
          </div>
        )}

        {!isOwner && (
          <div className='title-member'>
            {/* Display Enroll or Unenroll Button */}
            {!isEnrolled ? (
              <button className='btn' onClick={handleEnroll}>Enroll</button>
            ) : (
              <button className='btn btn-error' onClick={handleUnenroll}>Unenroll</button>
            )}
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
              <>
                <div
                  className={`tab ${activeTab === 'members' ? 'active' : ''}`}
                  onClick={() => handleTabClick('members')}
                >
                  Enrolled Users
                </div>
                <div
                  className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => handleTabClick('settings')}
                >
                  Settings
                </div>
              </>
            )}

          </div>

          {/* Content Based on Active Tab */}
          <div className="tab-content">
            {activeTab === 'tests' && (
              <div className="tests-list">
                {isOwner && <div className='Create-test' onClick={handleCreateTest}>+</div>}
                {classroomDetails.tests.length > 0 ? (
                  <ul>
                    {classroomDetails.tests.map((test) => (
                      <li key={test._id}>
                        <TestCard test={test} isOwner={isOwner} classroomId={classroomDetails._id} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  (isOwner? '' : <p>No tests available</p>)
                )}
              </div>
            )}
            {activeTab === 'leaderboard' && (
              <p>Leaderboard coming soon...</p>
            )}

            {activeTab === 'members' && (
              <div className="members-list">
                {classroomDetails.members.length > 0 ? (
                  <ol>
                  {classroomDetails.members.map((member) => (
                    <li key={member._id} className="member-item">
                      <span>{member.firstName} {member.lastName}</span>
                      <button className="btn-remove" onClick={() => handleUnenrollOthers(member._id)}>Remove</button>
                    </li>
                    
                  ))}
                  </ol>
                ) : (
                  <p>No enrolled users yet</p>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <p>Settings are still under development...</p>
            )}
          </div>

          {/* Enrollment Requests Modal */}
          {showRequests && (
            <EnrollmentRequests
              classroomId={classroomId}
              requests={classroomDetails.enrollRequests}
              onClose={toggleRequests}
              updateRequests={updateRequests}
              updateMembers={updateMembers}
            />
          )}
    </div>
  );
};

export default ClassroomView;