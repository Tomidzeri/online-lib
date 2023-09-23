import React from "react";
import useDeleteUser from "../../../../queries/korisnici/useDeleteUser";
import './DeleteUser.css';

const DeleteUser = ({ user, onDelete }) => {
  const deleteUser = useDeleteUser();

  const handleDelete = () => {
    deleteUser(user.id);
    onDelete(user.id);
  };

  return (
    <div className="delete">
      {/* <p>Are you sure you want to delete {user.name}?</p> */}
      <button onClick={handleDelete}>Delete user</button>
    </div>
  );
};

export default DeleteUser;
