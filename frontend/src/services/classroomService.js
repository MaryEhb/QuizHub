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
  
// Fetch classroom details by ID
export const fetchClassroomDetails = async (classroomId) => {
  try {
    const response = await API.get(`/classrooms/${classroomId}`);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while fetching classroom details.';
  }
};

