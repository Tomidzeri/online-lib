import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserData } from "../../../../queries/korisnici/fetchUserData";
import Form from "../../forms/Form";
import updateUserData from "../../../../queries/korisnici/useUpdateUserData";
import Submit from "../../buttons/Submit";
import Cancel from "../../buttons/Cancel";
import useUserDetails from "../../../../queries/korisnici/useUserDetails";

const EditUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const user = useUserDetails(userId);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    jmbg: "",
    password: "",
    password_confirmation: "",
    role: "",
    photoPath: null,
  });

  const [passwordError, setPasswordError] = useState("");

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
          password: "",
          password_confirmation: "",
          role: fetchedUserData.role,
          photoPath: fetchedUserData.photoPath,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchAndSetUserData();
  }, [userId]);

  const validatePasswordConfirmation = () => {
    if (formData.password !== formData.password_confirmation) {
      setPasswordError("Lozinke se ne poklapaju.");
    } else {
      setPasswordError("");
    }
  };

  const handleUpdateUser = async () => {
    validatePasswordConfirmation();
  
    if (passwordError) {
      return;
    }
  
    const updatedFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      updatedFormData.append(key, formData[key]);
    });
  
    try {
      const updatedData = await updateUserData(userId, updatedFormData); // Send formData to the backend
      console.log("User data updated:", updatedData);
      toast.success("Detalji korisnika uspješno izmijenjeni.");
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Greska prilikom izmjene korisnika.");
    }
  };
  

  const navigateToUserRolePage = (role) => {
    if (role === "Bibliotekar") {
      navigate("/librarians");
    } else {
      navigate("/students");
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
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
    },
    {
      name: "password_confirmation",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm password",
    },
  ];

  const roleDisplay = () => {
    if (user) {
      if (user.role === "Bibliotekar") {
        return <p>Svi Bibliotekari</p>;
      } else if (user.role === "Učenik") {
        return <p>Svi Ucenici</p>;
      }
    }
    return <p>Admins</p>;
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photoPath: URL.createObjectURL(file), 
      });
    }
  };
  

  return (
    <div className="mt-14 ml-15 flex flex-col">
      <div className="w-full">
        <div className="flex flex-col border-b border-gray-300 w-full fixed">
          <h2 className="text-2xl font-bold text-left ml-24">
            Izmjena podataka
          </h2>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 text-left pt-2 ml-24 w-20"
            onClick={() => navigateToUserRolePage(formData.role)}
          >
            {roleDisplay()}
          </button>
        </div>
      </div>
      <div>
        <div className="flex flex-row">
          <Form
            fields={formFields}
            formData={formData}
            setFormData={setFormData}
          />
          <div className="mt-20">
            <label className="block text-sm font-medium text-gray-700">
              Profilna slika
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                name="picture"
                onChange={handlePictureChange}
                className="py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="button-container">
          <Submit onClick={handleUpdateUser}>Sacuvaj</Submit>
          <Cancel onClick={() => navigateToUserRolePage(formData.role)}>
            Ponisti
          </Cancel>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
