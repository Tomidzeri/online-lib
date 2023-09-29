import React from 'react';
import libraryAPI from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { LuLogOut } from 'react-icons/lu';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = sessionStorage.getItem('token');
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

  return (
    <button
      className="block px-4 py-2 hover:font-bold hover:underline flex items-center justify-center"
      onClick={handleLogout}
    >
      <LuLogOut className="text-2l mr-2" />
      Logout
    </button>
  );
}

export default Logout;
