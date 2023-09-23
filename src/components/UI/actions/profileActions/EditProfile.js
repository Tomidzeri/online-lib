import React, { useState, useEffect } from "react";
import { fetchUserData } from "../../../../queries/korisnici/fetchUserData";
import updateUserData from "../../../../queries/korisnici/useUpdateUserData";
import { useParams } from "react-router-dom";
import Form from "../../forms/Form";
import Submit from "../../buttons/Submit";
import Cancel from "../../buttons/Cancel";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ token }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    imbg: "",
    role: "",
  });

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const user = await fetchUserProfile(token, loggedInUsername);
  //       setUserData(user);
  //     } catch (error) {
  //       console.error("Error fetching user profile:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, [token, loggedInUsername]);

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
          role: fetchedUserData.role,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchAndSetUserData();
  }, [userId]);

  //  const handleInputChange = (e) => {
  //    const { name, value } = e.target;
  //    setFormData((prevData) => ({
  //      ...prevData,
  //      [name]: value,
  //    }));
  //  };

  const handleUpdateUser = async () => {
    try {
      const updatedData = await updateUserData(userId, formData);
      console.log("User data updated:", updatedData);
    } catch (error) {
      console.error("Error updating user data:", error);
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
        <Cancel onClick={() => navigateToProfile()}>Cancel</Cancel>
      </div>
    </div>
  );
};

export default EditProfile;
