import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./UserAddForm.css";
import useCreateUser from "../../../queries/useCreateUser";
import Form from "../forms/Form";

const UserAddForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role");

  const createUser = useCreateUser();

  const [formData, setFormData] = useState({
    role_id: role === "Bibliotekar" ? 1 : 2,
    name: "",
    surname: "",
    jmbg: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createUser(formData);
    if (response) {
      console.log("User added successfully:", response);
      // Handle any necessary navigation or updates here
    }
  };

  return (
    <div className="form-container">
      <h3 className="h2">Create new user</h3>
      <Form
        fields={[
          {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "Name",
          },
          {
            name: "surname",
            label: "Surname",
            type: "text",
            placeholder: "Surname",
          },
          {
            name: "jmbg",
            label: "JMBG",
            type: "text",
            placeholder: "JMBG",
            pattern: "[0-9]{13}",
          },
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Email",
          },
          {
            name: "username",
            label: "Username",
            type: "text",
            placeholder: "Username",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Password",
          },
          {
            name: "password_confirmation",
            label: "Password confirmation",
            type: "password",
            placeholder: "Password confirmation",
          },
        ]}
        formData={formData} // Pass formData to Form component
        setFormData={setFormData} // Pass setFormData to Form component
        onSubmit={handleSubmit}
      />
      {role === "Bibliotekar" ? (
        <Link to="/librarians" className="cancel-button">
          Cancel
        </Link>
      ) : (
        <Link to="/students" className="cancel-button">
          Cancel
        </Link>
      )}
    </div>
  );
};

export default UserAddForm;
