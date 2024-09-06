import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/classroom">Classroom</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        {/* TODO: sidebar links, icons and styles */}
        {/* TODO: add logout button at the end of the sidebar */}
      </ul>
    </div>
  );
};

export default Sidebar;