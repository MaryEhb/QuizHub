import API from './api';

// Get user details
export const getUserDetails = async () => {
  try {
    const response = await API.get('users/profile');
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while updating the profile.';
  }
};

// Update user details
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

// Change user password
export const changePassword = async (passwordData) => {
  try {
    const response = await API.post('/users/change-password', passwordData);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while changing the password.';
  }
};