import React, { useState } from "react";
import libraryAPI from "../../../utils/api";
import "./UserAddForm.css";
import { useLocation } from "react-router-dom";

const UserAddForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role");
  const getRoleId = () => {
    switch (role) {
      case "Bibliotekar":
        return 1;
      case "Učenik":
        return 2;
      case "Administrator":
        console.error("Error: Cannot create administrators.");
        return null; 
      default:
        console.error("Error: Role not recognized.");
        return null; 
    }
  };

  const [formData, setFormData] = useState({
    role_id: getRoleId(), 
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
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="form-container">
      <h1>Create new user</h1>
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
        <button type="button" className="cancel-button">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserAddForm;

// form works, but it wont close on submit or onClose