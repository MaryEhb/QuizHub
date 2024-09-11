import React, { useEffect, useState } from 'react';
import { useAuth, useAuthUpdate } from '../context/AuthContext';
import { IoIosArrowBack } from "react-icons/io";
import lock from '../assets/lock.svg';
import request from '../assets/request.svg';
import person from '../assets/person.svg';
import EnrollmentRequests from '../components/EnrollmentRequest';
import { sendEnrollmentRequest, sendUnenrollmentRequest, fetchClassroomDetails } from '../services/classroomService';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';
import TestCard from '../components/TestCard';
import { useNavigate, useParams } from 'react-router-dom';

const Classroom = () => {
  const [classroomDetails, setClassroomDetails] = useState(null);
  const { user } = useAuth();
  const setUser = useAuthUpdate();
  const [activeTab, setActiveTab] = useState('tests');
  const [showRequests, setShowRequests] = useState(false); 
  const [showEnrollmentPrompt, setShowEnrollmentPrompt] = useState(false);

  const updateGeneralMsg = useGeneralMsgUpdate();
  const navigate = useNavigate();
  const { classroomId } = useParams(); // Extract classroomId from URL

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchClassroomDetails(classroomId);
        setClassroomDetails(details);
      } catch (error) {
        if (error.message === 'This classroom is private, and you are not enrolled to access it.') {
          setShowEnrollmentPrompt(true); // Show prompt if classroom is private and user not enrolled
        } else {
          setClassroomDetails({});
          updateGeneralMsg('Failed to load classroom details', 'error');
        }
      }
    };

    fetchDetails();
  }, [classroomId, updateGeneralMsg]);

  // Check if classroomDetails is null or undefined
  if (!classroomDetails && !showEnrollmentPrompt) {
    return (
      <div className="classroom-details">
        <button className="close-button" onClick={() => navigate(-1)}><IoIosArrowBack /></button> {/* Close Button */}
        <p>Loading classroom details...</p>
      </div>
    );
  }

  // Check if the user is the owner of the classroom
  const isOwner = classroomDetails?.owner && classroomDetails.owner._id === user?._id;

  // Check if the user is enrolled in the classroom
  const isEnrolled = classroomDetails?.members?.some(member => member._id === user?._id);

  const handleSendEnrollmentRequest = async () => {
    // if not enrolled and not public
    try {
      await sendEnrollmentRequest(classroomId);
      updateGeneralMsg('Enrollment request sent successfully', 'success');
      setShowEnrollmentPrompt(false); // Hide prompt after successful request
    } catch (error) {
      if (error === 'Enrollment request already sent') {
        updateGeneralMsg('You already sent an enrollment request', 'error');
      } else {
        updateGeneralMsg('Failed to send enrollment request', 'error');
      }
    } finally {
      setShowEnrollmentPrompt(false);
      navigate(-1);
    }
  };

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
      console.log(error.message);
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
      navigate(-1); // Navigate back
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

      updateGeneralMsg('Successfully unenrolled member from classroom', 'success');
    } catch (error) {
      updateGeneralMsg('Failed to unenroll member from classroom', 'error');
    }
  }

  const handleCreateTest = () => {
    navigate(`/classrooms/${classroomDetails._id}/create-test`);
  }

  return (
    <div className="classroom-details">
      {showEnrollmentPrompt && (
        <div className="enrollment-prompt">
          <p>You are not authorized to view this classroom. Would you like to send an enrollment request?</p>
          <button onClick={handleSendEnrollmentRequest}>Send Request</button>
          <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
      )}
      {classroomDetails && (<>
        <button className="close-button" onClick={() => navigate(-1)}><IoIosArrowBack /></button> {/* Close Button */}
      
      <div className='title-container'>
        <div className='title'>
          <h2>{classroomDetails.title}</h2>
          {!classroomDetails.isPublic && <div className='locked-icon icon' style={{ backgroundImage: `url(${lock})` }}></div>}
          <p>Owner: {classroomDetails.owner.firstName} {classroomDetails.owner.lastName}</p>
        </div>

        {isOwner && (
          <div className='title-owner'>
            <div className='option'>
              <p className={`${classroomDetails.members.length > 0 ? 'number' : ''}`}>{classroomDetails.members.length}</p>
              <div className='person-icon icon' onClick={() => handleTabClick('members')} style={{ backgroundImage: `url(${person})` }}></div>
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
          <ul className="tests-list">
            {isOwner && <div className='Create-test' onClick={handleCreateTest}>+</div>}
            {classroomDetails.tests.length > 0 ? (
              <>
                {classroomDetails.tests.map((test) => (
                  <li key={test._id}>
                    <TestCard test={test} isOwner={isOwner} classroomId={classroomDetails._id} />
                  </li>
                ))}
              </>
            ) : (
              (isOwner ? '' : <li>No tests available</li>)
            )}
          </ul>
        )}
        {activeTab === 'leaderboard' && (
          <p>Leaderboard coming soon...</p>
        )}

        {activeTab === 'members' && (
          <div className="members-list">
            {classroomDetails.members.length > 0 ? (
              <ol>
                {classroomDetails.members.map((member, index) => (
                  <li key={member._id}>
                    <p>{index + 1}. {member.firstName} {member.lastName}</p>
                    {isOwner && member._id !== user._id && (
                      <button className='btn-remove' onClick={() => handleUnenrollOthers(member._id)}>Remove</button>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <p>No members in this classroom</p>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <p>Settings functionality will be implemented soon.</p>
        )}
      </div>

      {showRequests && (
        <EnrollmentRequests
          enrollRequests={classroomDetails.enrollRequests}
          updateRequests={updateRequests}
          updateMembers={updateMembers}
          classroomId={classroomDetails._id}
        />
      )}
      </>)}
    </div>
  );
};

export default Classroom;