import API from './api';

// Fetch all tests in a classroom
export const fetchTests = async (classroomId) => {
  try {
    const response = await API.get(`/classrooms/${classroomId}/tests`);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while fetching tests.';
  }
};

// Fetch test details by ID
export const fetchTestDetails = async (classroomId, testId) => {
  try {
    const response = await API.get(`/classrooms/${classroomId}/tests/${testId}`);
    return response.data;
  } catch (error) {
    console.error(error)
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while fetching test details.';
  }
};

export const createTest = async (classroomId, newTest) => {
    try {
  
      // Send the request with updated questions
      const response = await API.post(`/classrooms/${classroomId}/tests`, newTest);
  
      return response.data;
    } catch (error) {
      console.error('Error creating test:', error);
      throw error.response && error.response.data
        ? error.response.data.message
        : 'An error occurred while creating the test.';
    }
};
  

// Update an existing test
export const updateTest = async (testId, updates) => {
  try {
    const response = await API.put(`/tests/${testId}`, updates);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while updating the test.';
  }
};

// Delete a test by ID
export const deleteTest = async (testId) => {
  try {
    const response = await API.delete(`/tests/${testId}`);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while deleting the test.';
  }
};

// Submit answers to a test
export const submitTestAnswers = async (testId, answers) => {
  try {
    const response = await API.post(`/tests/${testId}/submissions`, { answers });
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while submitting test answers.';
  }
};

// Fetch test submissions by test ID
export const fetchTestSubmissions = async (testId) => {
  try {
    const response = await API.get(`/tests/${testId}/submissions`);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while fetching test submissions.';
  }
};

// Fetch the leaderboard for a test
export const fetchTestLeaderboard = async (testId) => {
  try {
    const response = await API.get(`/tests/${testId}/leaderboard`);
    return response.data;
  } catch (error) {
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred while fetching the test leaderboard.';
  }
};