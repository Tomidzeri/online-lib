import React, { useState, useEffect } from "react";
import { fetchAuthorData } from "../../../queries/fetchAuthorData";
import Form from "../forms/Form";
import { useParams, useNavigate } from "react-router-dom";
import updateAuthorData from "../../../queries/useUpdateAuthorData";
import Submit from "../buttons/Submit";
import Cancel from "../buttons/Cancel";
import "../userActions/EditUserForm.css";

const EditAuthor = () => {
  const { authorId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    biography: "",
    image: "",
  });

  useEffect(() => {
    const fetchAndSetAuthorData = async () => {
      try {
        const fetchedAuthorData = await fetchAuthorData(authorId); 
        setFormData({
          name: fetchedAuthorData.name,
          surname: fetchedAuthorData.surname,
          biography: fetchedAuthorData.biography,
          image: fetchedAuthorData.image,
        });
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };

    fetchAndSetAuthorData();
  }, [authorId]);

  const handleUpdateAuthor = async () => {
    try {
      const updatedData = await updateAuthorData(authorId, formData); 
      console.log("Author data updated:", updatedData);
    } catch (error) {
      console.error("Error updating author data:", error);
    }
  };

  const navigateToAuthorsPage = () => {
    navigate("/authors"); 
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
      <div className="user-edit-form-container">
        <h2>Edit Author</h2>
        <Form
          fields={formFields}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div className="button-container">
        <Submit onClick={handleUpdateAuthor}>Submit</Submit>
        <Cancel onClick={navigateToAuthorsPage}>Cancel</Cancel>
      </div>
    </div>
  );
};

export default EditAuthor;
