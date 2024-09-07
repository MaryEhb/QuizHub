// This module provides authentication-related functions using the API instance.
import API from './api';
import Cookies from 'js-cookie';

// Logs in the user and stores the JWT token in cookies
export const login = async (email, password) => {
  try {
    // Send login request to the server
    const response = await API.post('/auth/login', { email, password });

    // Save the JWT token in cookies with a 7-day expiration
    Cookies.set('token', response.data.token, { expires: 7 });

    // Return user data or any other relevant information from the response
    return response.data;
  } catch (error) {
    // Throw error message if the login fails, ensuring proper error handling
    throw error.response && error.response.data
      ? error.response.data.message
      : 'An error occurred during login.';
  }
};

// Logs out the user by removing the JWT token from cookies
export const logout = () => {
  // Remove the JWT token from cookies
  Cookies.remove('token');
};

// Checks if the user is authenticated by verifying the token and fetching user data
export const checkAuth = async () => {
  try {
    // Retrieve the JWT token from cookies
    const token = Cookies.get('token');
    if (!token) {
      return { isAuthenticated: false }; // No token means not authenticated
    }

    // Send request to server to check if the token is valid
    const response = await API.get('/users/me'); // Use /users/me to fetch user data

    return { isAuthenticated: response.status === 200, user: response.data };
  } catch (error) {
    // Return not authenticated status if there's an error
    return { isAuthenticated: false, user: null };
  }
};