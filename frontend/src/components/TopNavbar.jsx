import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './../assests/angelist.png';
const TopNavBar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
          }
        });
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-10 mr-3" /> {/* Update the src with your logo path */}
        <span className="text-2xl font-bold">Sales Management </span> {/* Update "YourAppName" with your app's name */}
      </div>
      {user && (
        <div className="flex items-center">
          <img src={user.picture} alt="User" className="h-10 w-10 rounded-full mr-3" /> {/* Update user.picture based on your user object */}
          <span className="text-lg">{user.name}</span>
        </div>
      )}
    </div>
  );
};

export default TopNavBar;
