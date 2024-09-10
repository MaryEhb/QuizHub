import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';
import { GeneralMsgProvider } from './context/GenralMsgContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Classrooms from './pages/Classrooms';
import Profile from './pages/Profile';
import Layout from './components/Layout'; 
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Layout>{element}</Layout> : <Navigate to="/login" />;
};

const PublicRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? element : <Navigate to="/dashboard" />;
};



const App = () => {
  return (
    <Router>
      <LoadingProvider>
        <GeneralMsgProvider>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<PublicRoute element={<Login />} />} />
              <Route path="/register" element={<PublicRoute element={<Register />} />} />
              <Route path="/" element={<Navigate to="/dashboard" />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
              <Route path="/classrooms" element={<ProtectedRoute element={<Classrooms />} />} />
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
              <Route path="/leaderboard" element={<ProtectedRoute element={<Leaderboard />} />} />
              <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
              {/* Catch-All Route */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </AuthProvider>
        </GeneralMsgProvider>
      </LoadingProvider>
    </Router>
  );
};


export default App;