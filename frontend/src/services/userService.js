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