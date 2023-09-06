import React, { useState, useEffect } from "react";
import "./EditUserForm.css";
import { fetchUserData } from "../../../queries/fetchUserData";
import Form from "../forms/Form";
import { useParams } from "react-router-dom";
import updateUserData from "../../../queries/useUpdateUserData";

const EditUser = () => {
  const { userId } = useParams();

  // Step 1: Create a state variable to hold the form data
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    imbg: "",
    password: "",
    password_confirmation: ""
  });

  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      try {
        const fetchedUserData = await fetchUserData(userId);
        // Step 2: Set the initial form data from the fetched user data
        setFormData({
          name: fetchedUserData.name,
          surname: fetchedUserData.surname,
          email: fetchedUserData.email,
          username: fetchedUserData.username,
          jmbg: fetchedUserData.jmbg, 
          password: "", 
          password_confirmation: "",
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
      setPasswordError(""); // Clear the error message if passwords match
    }
  };

  const handleUpdateUser = async () => {
    // Step 4: Validate password confirmation before updating user data
    validatePasswordConfirmation();

    if (passwordError) {
      // Don't proceed with the update if there is a password confirmation error
      return;
    }

    try {
      // Step 5: Use the formData state variable as updatedUserData
      const updatedData = await updateUserData(userId, formData);
      console.log("User data updated:", updatedData);
    } catch (error) {
      console.error("Error updating user data:", error);
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
    { name: "jmbg", label: "JMBG", type: "text", placeholder: "Enter JMBG" },
    {
      name: "password",
      label: "Password",
      type: "password", 
      placeholder: "Enter password",
    },
    {
      name: "password_confirmation",
      label: "Confirm Password",
      type: "password", // Set the type to "password"
      placeholder: "Confirm password",
    },
  ];

  return (
    <div className="form-container">
      <h2>Edit User</h2>
      {/* Pass the formData state and setFormData function to the Form component */}
      <Form
        fields={formFields}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleUpdateUser}
      />
    </div>
  );
};

export default EditUser;
