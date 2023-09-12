import React, { useState } from "react";
import Form from "../forms/Form";
import useCreateAuthor from "../../../queries/useCreateAuthor";
import "../userActions/UserAddForm.css";

const CreateAuthor = () => {
  const createAuthor = useCreateAuthor(); 

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    biography: "",
    image: "",
  });

  const handleCreateAuthor = async () => {
    try {
      const newAuthorData = await createAuthor(formData);
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
        <button onClick={handleCreateAuthor}>Create Author</button>
      </div>
    </div>
  );
};

export default CreateAuthor;
