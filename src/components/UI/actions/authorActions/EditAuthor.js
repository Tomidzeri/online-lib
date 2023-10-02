import React, { useState, useEffect } from "react";
import { fetchAuthorData } from "../../../../queries/autori/fetchAuthorData";
import Form from "../../forms/Form";
import { useParams, useNavigate } from "react-router-dom";
import updateAuthorData from "../../../../queries/autori/useUpdateAuthorData";
import Submit from "../../buttons/Submit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        console.error("Greška pri preuzimanju podataka o autoru:", error);
        // Dodaj notifikaciju za grešku
        toast.error("Greška pri preuzimanju podataka o autoru.");
      }
    };

    fetchAndSetAuthorData();
  }, [authorId]);

  const handleUpdateAuthor = async () => {
    try {
      const updatedData = await updateAuthorData(authorId, formData);
      console.log("Podaci o autoru su ažurirani:", updatedData);
      // Dodaj notifikaciju za uspešno ažuriranje
      toast.success("Podaci o autoru su uspešno ažurirani.");
    } catch (error) {
      console.error("Greška pri ažuriranju podataka o autoru:", error);
      // Dodaj notifikaciju za grešku pri ažuriranju
      toast.error("Greška pri ažuriranju podataka o autoru.");
    }
  };

  const navigateToAuthorsPage = () => {
    navigate("/authors");
  };

  const formFields = [
    { name: "name", label: "Ime", type: "text", placeholder: "Unesite ime" },
    {
      name: "surname",
      label: "Prezime",
      type: "text",
      placeholder: "Unesite prezime",
    },
    {
      name: "biography",
      label: "Biografija",
      type: "textarea",
      placeholder: "Unesite biografiju",
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
              {formData?.name} {formData.surname}
            </h2>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700"
              onClick={navigateToAuthorsPage}
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
      </div>
      <div className="flex flex-row justify-end items-end">
        <Submit onClick={handleUpdateAuthor}>Sačuvaj</Submit>
      </div>
    </div>
  );
};

export default EditAuthor;
