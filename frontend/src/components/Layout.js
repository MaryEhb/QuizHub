import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content-container">
        <div className='content'>
        {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;