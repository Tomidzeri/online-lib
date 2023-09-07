import React, { useState } from "react";
<<<<<<< HEAD
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
=======
import { Link, useLocation } from "react-router-dom";
import libraryAPI from "../../../utils/api";
import "./UserAddForm.css";

const UserAddForm = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const role = searchParams.get("role");
>>>>>>> eb74f6a79c9477e4435551fb532fd862c09954af

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

    console.log(role);

<<<<<<< HEAD
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
=======
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async(event) => {
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

    return ( <
        div className = "form-container" >
        <
        h3 className = "h2" > Create new user < /h3> <
        form onSubmit = { handleSubmit } >
        <
        div className = "form-group" >
        <
        input type = "text"
        id = "name"
        name = "name"
        placeholder = "Name"
        value = { formData.name }
        onChange = { handleInputChange }
        className = "form-input"
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        input type = "text"
        id = "surname"
        name = "surname"
        placeholder = "Surname"
        value = { formData.surname }
        onChange = { handleInputChange }
        className = "form-input"
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        input type = "text"
        id = "jmbg"
        name = "jmbg"
        placeholder = "JMBG"
        value = { formData.jmbg }
        onChange = { handleInputChange }
        className = "form-input"
        pattern = "[0-9]{13}"
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        input type = "email"
        id = "email"
        name = "email"
        placeholder = "Email"
        value = { formData.email }
        onChange = { handleInputChange }
        className = "form-input"
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        input type = "text"
        id = "username"
        name = "username"
        placeholder = "Username"
        value = { formData.username }
        onChange = { handleInputChange }
        className = "form-input"
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        input type = "password"
        id = "password"
        name = "password"
        placeholder = "Password"
        value = { formData.password }
        onChange = { handleInputChange }
        className = "form-input"
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        input type = "password"
        id = "password_confirmation"
        name = "password_confirmation"
        placeholder = "Password confirmation"
        value = { formData.password_confirmation }
        onChange = { handleInputChange }
        className = "form-input"
        required /
        >
        <
        /div> <
        button type = "submit"
        className = "form-button" >
        Submit <
        /button> {
            role === "Bibliotekar" ? ( <
                Link to = "/librarians"
                className = "cancel-button" >
                Cancel <
                /Link>
            ) : ( <
                Link to = "/students"
                className = "cancel-button" >
                Cancel <
                /Link>
            )
        } <
        /form> <
        /div>
    );
>>>>>>> eb74f6a79c9477e4435551fb532fd862c09954af
};

export default UserAddForm;