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
  
  export const fetchClassroomDetails = async (classroomId) => {
    const response = await API.get(`/classrooms/${classroomId}`);
    return response.data;
  };