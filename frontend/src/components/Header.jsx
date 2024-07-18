import React from 'react';
import logo from './../assests/angelist.png';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-10 mr-3" />
          <span className="text-2xl font-bold">Sales Management</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
