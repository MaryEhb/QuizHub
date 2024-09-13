import API from './api';

// Function to create a submission for a test
export const createSubmission = async (testId, submissionData) => {
  try {
    const response = await API.post(`/tests/${testId}/submit`, submissionData);
    return response.data;  // Return the response data if successful
  } catch (error) {
    console.error('Error creating submission:', error.response?.data || error.message);
    throw error.response?.data || error.message;  // Throw error for further handling
  }
};

// Function to delete a submission for a test
export const deleteSubmission = async (testId, submissionId) => {
  try {
    const response = await API.delete(`/tests/${testId}/submissions/${submissionId}`);
    return response.data;  // Return the response data if successful
  } catch (error) {
    console.error('Error deleting submission:', error.response?.data || error.message);
    throw error.response?.data || error.message;  // Throw error for further handling
  }
};