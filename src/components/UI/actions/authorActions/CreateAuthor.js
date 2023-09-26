import React, { useState } from "react";
import Form from "../../forms/Form";
import useCreateAuthor from "../../../../queries/autori/useCreateAuthor";
import "../userActions/UserAddForm.css";
// import Cancel from "../../buttons/Cancel";
import Submit from "../../buttons/Submit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

      console.log("New author created:", newAuthorData);
  
      toast.success('Novi autor je uspješno kreiran.', {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error creating author:", error);
  
      toast.error('Došlo je do greške prilikom kreiranja autora.', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  

  const handleBackClick = () => {
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
    <div className="main-content mt-24 ml-20">
      <div className="w-full">
        <div className="flex flex-col border-b border-gray-300 w-full pb-2 mb-2">
          <h2 className="text-2xl font-bold text-left">Kreiraj Autora</h2>
          <div className="flex flex-row">
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700"
              onClick={handleBackClick}
            >
              Evidencija Autora
            </button>
          </div>
        </div>
        <Form
          fields={formFields}
          formData={formData}
          setFormData={setFormData}
        />
        <div className="button-container">
          <Submit onClick={handleCreateAuthor}>Kreiraj</Submit>
          {/* <Cancel onClick={() => navigate(`/authors`)}>Cancel</Cancel> */}
        </div>
      </div>
    </div>
  );
};

export default CreateAuthor;
