import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useGeneralMsgUpdate } from '../context/GenralMsgContext';
import { IoHomeOutline } from "react-icons/io5";
import { RiExpandRightFill, RiExpandLeftFill } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineLeaderboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuSettings } from "react-icons/lu";

const Sidebar = () => {
  const [isShrink, setIsShrink] = useState(true);
  const { logout } = useAuth();
  const setGeneralMsg = useGeneralMsgUpdate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setGeneralMsg('Logged Out Successfully', 'success');
  };

  const toggleSidebar = () => {
    setIsShrink(!isShrink);
  };

  const isActive = (path) => {
    return location.pathname.includes(path);
  }

  return (
    <nav className={`sidebar ${isShrink ? 'shrink' : ''}`} aria-label="Main Sidebar Navigation">
      <div className='logo'>
        <div aria-label="Application Name">QuizHub</div>
        <button 
          title={isShrink ? 'Expand sidebar' : 'Shrink sidebar'}
          aria-label={isShrink ? 'Expand sidebar' : 'Shrink sidebar'} 
          className="shrink-toggle" 
          onClick={toggleSidebar}
          aria-expanded={!isShrink}
        >
          {isShrink ? <RiExpandRightFill className='icon'/> : <RiExpandLeftFill className='icon'/>}
        </button>
      </div>

      <ul role="menubar">
        <li className={isActive('/dashboard') ? 'active' : ''} role="none">
          <Link to="/dashboard" role="menuitem" aria-label="Dashboard" title={isShrink ? 'Dashboard' : ''}>
            <div className='link-icon-container'><IoHomeOutline className='link-icon'/></div>
            {!isShrink && <span>Dashboard</span>}
          </Link>
        </li>
        <li className={isActive('/myclassrooms') ? 'active' : ''} role="none">
          <Link to="/myclassrooms" role="menuitem" aria-label="My Classrooms" title={isShrink ? 'My Classrooms' : ''}>
            <div className='link-icon-container'><SiGoogleclassroom className='link-icon'/></div>
            {!isShrink && <span>My Classrooms</span>}
          </Link>
        </li>
        <li className={isActive('/leaderboard') ? 'active' : ''} role="none">
          <Link to="/leaderboard" role="menuitem" aria-label="Leaderboard" title={isShrink ? 'Leaderboard' : ''}>
            <div className='link-icon-container'><MdOutlineLeaderboard className='link-icon'/></div>
            {!isShrink && <span>Leaderboard</span>}
          </Link>
        </li>
        <li className={isActive('/profile') ? 'active' : ''} role="none">
          <Link to="/profile" role="menuitem" aria-label="Profile" title={isShrink ? 'Profile' : ''}>
            <div className='link-icon-container'><CgProfile className='link-icon'/></div>
            {!isShrink && <span>Profile</span>}
          </Link>
        </li>
        <li className={isActive('/settings') ? 'active' : ''} role="none">
          <Link to="/settings" role="menuitem" aria-label="Settings" title={isShrink ? 'Settings' : ''}>
            <div className='link-icon-container'><LuSettings className='link-icon'/></div>
            {!isShrink && <span>Settings</span>}
          </Link>
        </li>
      </ul>

      <button 
        className="logout-button" 
        onClick={handleLogout} 
        aria-label="Logout" 
        title={isShrink ? 'Logout' : ''}
      >
        <FaSignOutAlt />{!isShrink && 'Logout'}
      </button>
    </nav>
  );
};

export default Sidebar;