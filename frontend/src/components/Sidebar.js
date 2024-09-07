import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const setGeneralMsg = useGeneralMsgUpdate();
  const handleLogout = () => {
    logout();
    setGeneralMsg('Logged Out Successfully', 'success');
  };
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/classrooms">Classrooms</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        {/* TODO: sidebar links, icons and styles */}
        {/* TODO: add logout button at the end of the sidebar */}
      </ul>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;