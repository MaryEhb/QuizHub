import API from './api';

// Create new classroom owned by the logged in user
export const addClassroom = async (title, description='', isPublic=true) => {
    try {
      const response = await API.post('/classrooms', { title, description, isPublic });
      return response
    } catch (error) {
      throw error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred during classroom creation.';
    }
};

// Fetch classrooms with pagination
export const fetchClassrooms = async (limit = 10, skip = 0) => {
  try {
    const response = await API.get('/classrooms', {
      params: { limit, skip }
    });
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while fetching classrooms.';
  }
};

// Fetch classrooms for the logged-in user
export const fetchMyClassrooms = async (userId) => {
  try {
    const response = await API.get(`/users/${userId}/classrooms`);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while fetching your classrooms.';
  }
};
  
// Fetch classroom details by ID
export const fetchClassroomDetails = async (classroomId) => {
  try {
    const response = await API.get(`/classrooms/${classroomId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      // Custom error message for 403: Private classroom and not enrolled
      throw new Error('This classroom is private, and you are not enrolled to access it.');
    }

    // Log the error and throw a general error message for other cases
    console.log(error);
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while fetching classroom details.';
  }
};

// Send enrollment request to a classroom
export const sendEnrollmentRequest = async (classroomId) => {
  try {
    const response = await API.post(`/classrooms/${classroomId}/enroll`);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while sending the enrollment request.';
  }
};

// Accept enrollment request for a classroom
export const acceptEnrollmentRequest = async (classroomId, userId) => {
  try {
    const response = await API.put(`/classrooms/${classroomId}/enroll/${userId}/accept`);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while accepting the enrollment request.';
  }
};

// Reject enrollment request for a classroom
export const rejectEnrollmentRequest = async (classroomId, userId) => {
  try {
    const response = await API.put(`/classrooms/${classroomId}/enroll/${userId}/reject`);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while rejecting the enrollment request.';
  }
};

export const sendUnenrollmentRequest = async (classroomId, userId = null) => {
  try {
    const response = await API.post(`/classrooms/${classroomId}/unenroll`, { userId });
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while rejecting the enrollment request.';
  }
}


export const updateRecentClassrooms = async (recentClassrooms) => {
  try {
    const response = await API.post(`/users/recent-classrooms/${recentClassrooms}`);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while updating recent classrooms.';
  }
};

export const getRecentClassrooms = async () => {
  try {
    const response = await API.get('/users/recent-classrooms');
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while fetching recent classrooms.';
  }
};