import React, { useState } from "react";
import Form from "../forms/Form";
import useCreateAuthor from "../../../queries/useCreateAuthor";
import "../userActions/UserAddForm.css";
import Cancel from "../buttons/Cancel";
import Submit from "../buttons/Submit";
import { useNavigate } from "react-router-dom";

const CreateAuthor = () => {
  const createAuthor = useCreateAuthor();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    biography: "",
    image: "",
  });

  const handleCreateAuthor = async () => {
    try {
      const newAuthorData = await createAuthor(formData);
      navigate("/authors");
      console.log("New author created:", newAuthorData);
    } catch (error) {
      console.error("Error creating author:", error);
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
      name: "biography",
      label: "Biography",
      type: "text",
      placeholder: "Enter biography",
    },
    {
      name: "image",
      label: "Image",
      type: "text",
      placeholder: "Enter image URL",
    },
  ];

  return (
    <div className="page">
      <div className="user-add-form-container">
        <h2>Create Author</h2>
        <Form
          fields={formFields}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div className="button-container">
        <Submit onClick={handleCreateAuthor}>Update</Submit>
        <Cancel onClick={() => navigate(`/authors`)}>Cancel</Cancel>
      </div>
    </div>
  );
};

export default CreateAuthor;
