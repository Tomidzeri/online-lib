import React, { useState } from "react";
import Form from "../../forms/Form";
import useCreateAuthor from "../../../../queries/autori/useCreateAuthor";
// import "../userActions/UserAddForm.css";
import Submit from "../../buttons/Submit";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fetchAuthors from "../../../../queries/autori/fetchAuthors";

const CreateAuthor = () => {
  const createAuthor = useCreateAuthor();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    biography: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleCreateAuthor = async () => {
    try {
      const authorExists = await fetchAuthors(formData.name, formData.surname);

      if (authorExists) {
        toast.error("Autor sa istim imenom i prezimenom već postoji.", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("surname", formData.surname);
        formDataToSend.append("biography", formData.biography);

        if (imageFile) {
          formDataToSend.append("image", imageFile);
        }

        const newAuthorData = await createAuthor(formDataToSend);

        console.log("New author created:", newAuthorData);

        toast.success("Novi autor je uspješno kreiran.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error creating author:", error);

      toast.error("Došlo je do greške prilikom kreiranja autora.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleBackClick = () => {
    navigate("/authors");
  };

  const formFields = [
    { name: "name", label: "Ime", type: "text", placeholder: "Enter name" },
    {
      name: "surname",
      label: "Prezime",
      type: "text",
      placeholder: "Enter surname",
    },
    {
      name: "biography",
      label: "Biografija",
      type: "text",
      placeholder: "Enter biography",
    },
  ];

  return (
    <div className="mt-12 ml-15">
      <div className="w-full">
        <div className="flex justify-between border-b border-gray-300 w-full">
          <div className="flex flex-col">
            <h2
              style={{ fontFamily: "'Rubik', sans-serif" }}
              className="text-5xl font-medium text-left ml-20"
            >
              Kreiraj autora
            </h2>
            <div className="flex items-center ml-20">
              <button
                type="button"
                className="text-blue-500 hover:text-blue-700"
                onClick={handleBackClick}
              >
                Evidencija Autora
              </button>
            </div>
          </div>
        </div>
        <Form
          fields={formFields}
          formData={formData}
          setFormData={setFormData}
        />
        <div className="flex flex-col justify-between">
          <div className="mb-4 text-center">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Slika:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border rounded p-2 w-80 mx-auto"
            />
          </div>

          <div className="flex items-end justify-end">
            <Submit onClick={handleCreateAuthor}>Kreiraj</Submit>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAuthor;
