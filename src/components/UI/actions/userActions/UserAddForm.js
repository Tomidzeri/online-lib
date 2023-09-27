import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserAddForm.css";
import useCreateUser from "../../../../queries/korisnici/useCreateUser";
import Form from "../../forms/Form";
import Submit from "../../buttons/Submit";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const UserAddForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role");

  const createUser = useCreateUser();

  const [formData, setFormData] = useState({
    role_id: role === "Bibliotekar" ? 1 : 2,
    name: "",
    surname: "",
    jmbg: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createUser(formData);
      if (response) {
        console.log("User added successfully:", response);
        toast.success("Uspjesno kreiranje novog korisnika."); 
      }
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Greska pri dodavanju novog korisnika."); 
    }
  };

  const handleBackClick = () => {
    if (role === "Bibliotekar") {
      navigate("/librarians");
    } else if (role === "Ucenik") {
      navigate("/students");
    }
  };

  // const cancelLink = role === "Bibliotekar" ? "/librarians" : "/students";
  const backButtonLabel =
    role === "Bibliotekar" ? "Svi Bibliotekari" : "Svi Ucenici";

  return (
    <div className="main-content mt-24 ml-20">
      <div className="w-full">
        <div className="flex flex-col border-b border-gray-300 w-full pb-2 mb-2">
          <h2 className="text-2xl font-bold text-left">
            {role === "Bibliotekar"
              ? "Kreiraj Bibliotekara"
              : "Kreiraj Ucenika"}
          </h2>
          <div className="flex flex-row">
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700"
              onClick={handleBackClick}
            >
              {backButtonLabel}
            </button>
          </div>
        </div>
        <Form
          fields={[
            {
              name: "name",
              label: "Ime",
              type: "text",
              placeholder: "Name",
            },
            {
              name: "surname",
              label: "Prezime",
              type: "text",
              placeholder: "Surname",
            },
            {
              name: "jmbg",
              label: "JMBG",
              type: "number",
              placeholder: "JMBG",
              pattern: "[0-9]{13}",
            },
            {
              name: "email",
              label: "E-mail",
              type: "email",
              placeholder: "Email",
            },
            {
              name: "username",
              label: "Korisnicko ime",
              type: "text",
              placeholder: "Username",
            },
            {
              name: "password",
              label: "Password",
              type: "password",
              placeholder: "Password",
            },
            {
              name: "password_confirmation",
              label: "Password confirmation",
              type: "password",
              placeholder: "Password confirmation",
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        />
        <div className="button-container">
          <Submit type="submit" onClick={handleSubmit}>
            Sacuvaj
          </Submit>
        </div>
      </div>
    </div>
  );
};

export default UserAddForm;
