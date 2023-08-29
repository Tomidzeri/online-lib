import React from "react";
import libraryAPI from "../../../utils/api";
import './DeleteUser.css';

const DeleteUser = ({ user, onDelete }) => {
  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await libraryAPI.delete(`/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(user.id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="delete">
      <p>Are you sure you want to delete {user.name}?</p>
      <button onClick={handleDelete}>Delete user</button>
    </div>
  );
};

export default DeleteUser;
