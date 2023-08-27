import React, { useState } from "react";
import libraryAPI from "../../../utils/api";
import "./UserAddForm.css";

const UserAddForm = ({ role, onClose }) => {
  const [formData, setFormData] = useState({
    role_id: role === "Bibliotekar" ? 1 : role === "Ucenik" ? 2 : 3,
    name: "",
    surname: "",
    jmbg: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await libraryAPI.post("/users/store", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User added successfully:", response.data);
      onClose(); 
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleCancel = () => {
    onClose(); 
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jmbg">JMBG:</label>
          <input
            type="text"
            id="jmbg"
            name="jmbg"
            value={formData.jmbg}
            onChange={handleInputChange}
            className="form-input"
            pattern="[0-9]{13}" 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password_confirmation">Confirm Password:</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="form-button">
          Submit
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserAddForm;
