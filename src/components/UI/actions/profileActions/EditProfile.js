import React, { useState, useEffect } from "react";
import { UpdateUser } from "../../../../queries/profileInfo/updateUserData";
import Form from "../../forms/Form";
import Submit from "../../buttons/Submit";
import Cancel from "../../buttons/Cancel";
import { useNavigate } from "react-router-dom";
import { ProfileData } from "../../../../queries/profileInfo/useProfileData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    jmbg: "",
    role: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      try {
        const response = await ProfileData();
        
        if (response && response.data && response.data.data) {
          const fetchedUserData = response.data.data;
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
  
          console.log(fetchedUserData);
        } else {
          console.error("Invalid user data response format");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchAndSetUserData();
  }, []);
  
  const updatedFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      updatedFormData.append(key, formData[key]);
    });

  const handleUpdateUser = async () => {
    try {
      const updatedData = await UpdateUser(updatedFormData);
      console.log("User data updated:", updatedData);
      toast.success("Detalji korisnika uspješno izmijenjeni.");
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Greska prilikom izmjene korisnika.");
    }
  };

  const navigateToProfile = () => {
    navigate("/profile");
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
      type: "number",
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
          onSubmit={handleUpdateUser}
        />
      </div>
      <div className="button-container">
        <Submit onClick={handleUpdateUser}>Submit</Submit>
        <Cancel onClick={() => navigateToProfile()}>Cancel</Cancel>
      </div>
    </div>
  );
};

export default EditProfile;
