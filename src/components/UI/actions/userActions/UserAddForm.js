import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserAddForm.css";
import useCreateUser from "../../../../queries/korisnici/useCreateUser";
import Form from "../../forms/Form";
import Submit from "../../buttons/Submit";
import Cancel from "../../buttons/Cancel";

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
    const response = await createUser(formData);
    if (response) {
      console.log("User added successfully:", response);
    }
  };

  const cancelLink = role === "Bibliotekar" ? "/librarians" : "/students";

  return (
    <div className="main-content mt-14 ml-20">
      <div className="w-full">
        <div className="flex flex-col border-b border-gray-300 w-full pb-2">
          <h2 className="text-2xl font-bold text-center">Novi Korisnik</h2>
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
            Submit
          </Submit>
          <Cancel onClick={() => navigate(cancelLink)}>Cancel</Cancel>
        </div>
      </div>
    </div>
  );
};

export default UserAddForm;
