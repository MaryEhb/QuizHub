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
  const [isShrink, setIsShrink] = useState(false);
  const { logout } = useAuth();
  const setGeneralMsg = useGeneralMsgUpdate();
  const location = useLocation(); // Access the current route location

  const handleLogout = () => {
    logout();
    setGeneralMsg('Logged Out Successfully', 'success');
  };

  const toggleSidebar = () => {
    setIsShrink(!isShrink);
  };

  const isActive = (path) => {
    return location.pathname === path;
  }

  return (
    <div className={`sidebar ${isShrink ? 'shrink' : ''}`}>
      <div className='logo'>
        <div>QuizHub</div>
        <button className="shrink-toggle" onClick={toggleSidebar}>
          {isShrink ? <RiExpandRightFill className='icon'/> : <RiExpandLeftFill className='icon'/>}
        </button>
      </div>
      <ul>
        <li className={isActive('/dashboard') ? 'active' : ''}>
          <Link to="/dashboard">
            <div className='link-icon-container'><IoHomeOutline className='link-icon'/></div>
            {!isShrink && 'Dashboard'}
          </Link>
        </li>
        <li className={isActive('/classrooms') ? 'active' : ''}>
          <Link to="/classrooms">
            <div className='link-icon-container'><SiGoogleclassroom className='link-icon'/></div>
            {!isShrink && 'Classrooms'}
          </Link>
        </li>
        <li className={isActive('/leaderboard') ? 'active' : ''}>
          <Link to="/leaderboard">
            <div className='link-icon-container'><MdOutlineLeaderboard className='link-icon'/></div>
            {!isShrink && 'Leaderboard'}
          </Link>
        </li>
        <li className={isActive('/profile') ? 'active' : ''}>
          <Link to="/profile">
            <div className='link-icon-container'><CgProfile className='link-icon'/></div>
            {!isShrink && 'Profile'}
          </Link>
        </li>
        <li className={isActive('/settings') ? 'active' : ''}>
          <Link to="/settings">
            <div className='link-icon-container'><LuSettings className='link-icon'/></div>
            {!isShrink && 'Settings'}
          </Link>
        </li>
      </ul>
      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt />{!isShrink && 'Logout'}
      </button>
    </div>
  );
};

export default Sidebar;