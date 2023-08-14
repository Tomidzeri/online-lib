import React from 'react';
import libraryAPI from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Logout({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await libraryAPI.post(
        '/logout',
        { all: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': `${token}`,
          },
        }
      );

      localStorage.removeItem('token');
      setToken('');

      navigate('/login');

      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
