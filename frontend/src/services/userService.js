import API from './api';

export const updateUserDetails = async (userData) => {
  try {
    const response = await API.put('/users/profile', userData);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while updating the profile.';
  }
};

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