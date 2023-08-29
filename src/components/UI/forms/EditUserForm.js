import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import libraryAPI from "../../../utils/api";
import "./EditUserForm.css";
import { fetchUserData } from "../../../queries/fetchUserData";

const EditUserForm = ({ onCancel, onUpdate }) => {
  const { userId } = useParams();

  const [editedUser, setEditedUser] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchUserData(userId);
        console.log("Fetched user:", user);
        setEditedUser(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleCancel = () => {
    onCancel();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await libraryAPI.put(
        `/users/${userId}`, // Use the userId to specify which user to update
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Updated user:", response.data.data);
      onUpdate(response.data.data);
    } catch (error) {
      console.error("Error updating user:", error);
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
          {/* <div className="form-group">
            <label>JMBG</label>
            <input
              type="text"
              name="jmbg"
              value={editedUser.jmbg}
              onChange={handleInputChange}
            />
          </div> */}
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

// ne radi edit forma
// prikazuje u input detalje korisnika
// ali ih ne mijenja na submit
