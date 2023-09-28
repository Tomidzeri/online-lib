import React from "react";
import { useNavigate } from 'react-router-dom'; 
import useDeleteUser from "../../../../queries/korisnici/useDeleteUser";
import '../../userActions/DeleteUser.css';

const DeleteUser = ({ user, onDelete }) => {
  const deleteUser = useDeleteUser();
  const navigate = useNavigate(); 

  const handleDelete = async () => {
    try {
      await deleteUser(user.id);
      onDelete(user.id);

      sessionStorage.removeItem('token');
      navigate('/login');

      console.log('User deleted and logged out');
    } catch (error) {
      console.error('Delete user error:', error);
    }
  };

  return (
    <div className="delete">
      <p>Are you sure you want to delete {user.name}?</p>
      <button onClick={handleDelete}>Izbrisi korisnika</button>
    </div>
  );
};

export default DeleteUser;
