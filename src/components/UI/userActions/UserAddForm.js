import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserAddForm.css";
import useCreateUser from "../../../queries/useCreateUser";
import Form from "../forms/Form";
import Submit from "../buttons/Submit";
import Cancel from "../buttons/Cancel";

const UserAddForm = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
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
    }
  };

  const cancelLink = role === "Bibliotekar" ? "/librarians" : "/students";

  return (
    <div className="page">
    <div className="user-add-form-container">
      <h3>Create new user</h3>
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
            type: "number",
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
        formData={formData} 
        setFormData={setFormData} 
        onSubmit={handleSubmit}
      />
    </div>
     <div className="button-container">
     <Submit type="submit" onClick={handleSubmit}>Submit</Submit>
     <Cancel onClick={() => navigate(cancelLink)}>
       Cancel
     </Cancel>
   </div>
 </div>
  );
};

export default UserAddForm;
