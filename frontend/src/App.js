import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { LoadingProvider } from './context/LoadingContext';
import { GeneralMsgProvider } from './context/GenralMsgContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MyClassrooms from './pages/MyClassrooms';
import Profile from './pages/Profile';
import Layout from './components/Layout'; 
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import CreateTest from './pages/CreateTest';
import Classroom from './pages/Classroom';
import Test from './pages/Test';
import NotFound from './pages/NotFound'; 

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? <Layout>{element}</Layout> : <Navigate to="/login" />;
};

const PublicRoute = ({ element }) => {
  const { user } = useAuth();
  return !user ? element : <Navigate to="/dashboard" />;
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

              {/* Protected Routes */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
              <Route path="/dashboard/:page" element={<ProtectedRoute element={<Dashboard />} />} />
              <Route path="/myclassrooms" element={<ProtectedRoute element={<MyClassrooms />} />} />
              <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
              <Route path="/leaderboard" element={<ProtectedRoute element={<Leaderboard />} />} />
              <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />

              <Route path="/classrooms/:classroomId" element={<ProtectedRoute element={<Classroom />} />}/>
              <Route path="/classrooms/:classroomId/tests/:testId" element={<ProtectedRoute element={<Test />} />}/>
              <Route path="/classrooms/:classroomId/create-test" element={<ProtectedRoute element={<CreateTest />} />}/>

              {/* Catch-All Route */}
              <Route path="*" element={<NotFound />} />
              {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            </Routes>
          </AuthProvider>
        </GeneralMsgProvider>
      </LoadingProvider>
    </Router>
  );
};

export default App;