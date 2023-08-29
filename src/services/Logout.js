import React from 'react';
import libraryAPI from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    try {
      await libraryAPI.post(
        '/logout',
        { all: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      sessionStorage.removeItem('token');

      navigate('/login');

      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
