import React, { useState, useEffect } from "react";
import { fetchAuthorData } from "../../../../queries/autori/fetchAuthorData";
import Form from "../../forms/Form";
import { useParams, useNavigate } from "react-router-dom";
import updateAuthorData from "../../../../queries/autori/useUpdateAuthorData";
import Submit from "../../buttons/Submit";
import { Typography } from "@mui/material";

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
          biography: fetchedAuthorData.bio,
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
      type: "textare",
      placeholder: "Enter biography",
    },
  ];

  return (
    <div className="main-content mt-24 ml-20 flex flex-col content-end">
      <div className="w-full">
        <div className="flex flex-col justify-baseline items-baseline border-b border-gray-300 mb-14 text-center">
          <Typography variant="h4" align="center" gutterBottom>
            {formData?.name} {formData.surname}
          </Typography>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700"
            onClick={navigateToAuthorsPage}
          >
            Evidencija Autora
          </button>
        </div>
        <Form
          fields={formFields}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
      <div className="flex flex-row justify-end items-end">
        <Submit onClick={handleUpdateAuthor}>Submit</Submit>
      </div>
    </div>
  );
};

export default EditAuthor;
