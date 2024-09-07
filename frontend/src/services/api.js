// Axios instance with default settings for API requests
// - Base URL: Defined in environment variables (BACKEND_API_URL)
// - Includes credentials (cookies) for cross-origin requests
// - Automatically adds Authorization header with JWT token (if available)
import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to modify requests before they are sent
// Attaches the JWT token (stored in cookies) 
// as a Bearer token in the Authorization header if available
API.interceptors.request.use((req) => {  
    const token = Cookies.get('token');
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;