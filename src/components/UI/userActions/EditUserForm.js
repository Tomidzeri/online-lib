import React from "react";
import { useParams } from "react-router-dom";
import "./EditUserForm.css";
import useFetchUserData from '../../../queries/useFetchUserData';
import useUpdateUserData from '../../../queries/useUpdateUserData';

const EditUserForm = ({ onCancel, onUpdate }) => {
  const { userId } = useParams();
  const [editedUser, setEditedUser] = useFetchUserData(userId);
  const updateUser = useUpdateUserData();

  const handleCancel = () => {
    onCancel();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdate = async () => {
    const updatedUser = await updateUser(userId, editedUser);
    if (updatedUser) {
      console.log("Updated user:", updatedUser);
      onUpdate(updatedUser);
    }
  };

  return (
    <div className="form-container">
      <h1>Edit User</h1>
      {editedUser.name !== "" && (
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Surname</label>
            <input
              type="text"
              name="surname"
              value={editedUser.surname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={editedUser.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={editedUser.password_confirmation}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-buttons">
            <button className="update-button" onClick={handleUpdate}>
              Update
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUserForm;
