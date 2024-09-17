import React from 'react';
import { acceptEnrollmentRequest, rejectEnrollmentRequest } from '../services/classroomService'; // Assuming the service is here
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';
import { IoIosArrowBack } from 'react-icons/io';

const EnrollmentRequests = ({ classroomId, requests, updateRequests, updateMembers, onClose }) => {
  const generalMsgUpdate = useGeneralMsgUpdate();
  
  const handleAccept = async (request) => {
    try {
        await acceptEnrollmentRequest(classroomId, request._id);
        generalMsgUpdate('Request accepted!', 'success');
        updateRequests(requests.filter(req => req._id !== request._id));
        updateMembers({ _id: request._id, firstName: request.firstName, lastName: request.lastName });
    } catch (error) {
        // console.error('Error accepting request:', error);
        generalMsgUpdate('Error accepting the request', 'error');
    }
  };

  const handleReject = async (userId) => {
    try {
      await rejectEnrollmentRequest(classroomId, userId);
      generalMsgUpdate('Request rejected!', 'success');
      updateRequests(requests.filter(request => request._id !== userId));
    } catch (error) {
      generalMsgUpdate('Error rejecting the request', 'error');
    }
  };

  return (
    <div className="enrollment-requests-modal prompt-container">
      <div className='prompt-background' onClick={onClose}></div>
      <div className='prompt'>
      <button className="btn-remove" onClick={onClose}><IoIosArrowBack /></button>
        <h3>Enrollment Requests</h3>
        {requests.length > 0 ? (
          <ul>
            {requests.map((request, index) => (
              <li key={request._id}>
                <p>{index + 1}. {request.firstName} {request.lastName}</p>
                <button className='btn btn-success' onClick={() => handleAccept(request)}>Accept</button>
                <button className='btn btn-remove' onClick={() => handleReject(request._id)}>Reject</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className='empty'>No enrollment requests.</p>
        )}
      </div>
    </div>
  );
};

export default EnrollmentRequests;
