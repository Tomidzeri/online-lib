import React, { useState, useEffect } from "react";
import "./EditUserForm.css";
import { fetchUserData } from "../../../queries/fetchUserData";
import Form from "../forms/Form";
import { useParams, useNavigate } from "react-router-dom";
import updateUserData from "../../../queries/useUpdateUserData";
import Submit from "../buttons/Submit";
import Cancel from "../buttons/Cancel";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    imbg: "",
    password: "",
    password_confirmation: "",
    role: "",
  });

  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      try {
        const fetchedUserData = await fetchUserData(userId);
        setFormData({
          name: fetchedUserData.name,
          surname: fetchedUserData.surname,
          email: fetchedUserData.email,
          username: fetchedUserData.username,
          jmbg: fetchedUserData.jmbg,
          password: "",
          password_confirmation: "",
          role: fetchedUserData.role,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchAndSetUserData();
  }, [userId]);

  const validatePasswordConfirmation = () => {
    if (formData.password !== formData.password_confirmation) {
      setPasswordError("Password confirmation does not match.");
    } else {
      setPasswordError("");
    }
  };

  const handleUpdateUser = async () => {
    validatePasswordConfirmation();

    if (passwordError) {
      return;
    }

    try {
      const updatedData = await updateUserData(userId, formData);
      console.log("User data updated:", updatedData);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const navigateToUserRolePage = (role) => {
    if (role === "Bibliotekar") {
      navigate("/librarians");
    } else {
      navigate("/students");
    }
  };

  const formFields = [
    { name: "name", label: "Name", type: "text", placeholder: "Enter name" },
    {
      name: "surname",
      label: "Surname",
      type: "text",
      placeholder: "Enter surname",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email",
    },
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter username",
    },
    {
      name: "jmbg",
      label: "JMBG",
      type: "text",
      placeholder: "Enter JMBG",
      pattern: "[0-9]{13}",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
    },
    {
      name: "password_confirmation",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm password",
    },
  ];

  return (
    <div className="page">
      <div className="user-edit-form-container">
        <h2>Edit User</h2>
        <Form
          fields={formFields}
          formData={formData}
          setFormData={setFormData}
          // onSubmit={handleUpdateUser}
        />
      </div>
      <div className="button-container">
        <Submit onClick={handleUpdateUser}>Submit</Submit>
        <Cancel onClick={() => navigateToUserRolePage(formData.role)}>
          Cancel
        </Cancel>
      </div>
    </div>
  );
};

export default EditUser;
