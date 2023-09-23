import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import useUserDetails from "../../../../queries/korisnici/useUserDetails";
import "./ViewUserDetails.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import photo from "../../../../Images/photo.jpg";

function ViewUserDetails() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const user = useUserDetails(userId);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const navigation = () => {
    if (user.role === "Bibliotekar") {
      navigate("/librarians");
    } else {
      navigate("/students");
    }
  };

  return (
    <div className="main-content mt-24 ml-20">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full pb-2 mb-2">
          <h2 className="text-2xl font-bold text-center">Korisnik</h2>
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <AiOutlineLoading3Quarters className="text-red-500 text-4xl animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-row">
                <div className="flex flex-col text-left">
                  <div>
                    <p className="text-left font-black">Ime i prezime</p>
                    <p className="text-left">
                      {user.name} {user.surname}
                    </p>
                  </div>
                  <div className="p-0">
                    <p className="text-left font-black">Tip korisnika:</p>
                    <p className="text-left">{user.role}</p>
                  </div>
                  <div className="p-0">
                    <p className="text-left font-black">JMBG:</p>
                    <p className="text-left">{user.jmbg}</p>
                  </div>
                  <div className="p-0">
                    <p className="text-left font-black">Email:</p>
                    <p className="text-left">{user.email}</p>
                  </div>
                  <div className="p-0">
                    <p className="text-left font-black">Korisnicko ime:</p>
                    <p className="text-left">{user.username}</p>
                  </div>
                  <div className="p-0">
                    <p className="text-left font-black">Uloga:</p>
                    <p className="text-left">{user.role}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-baseline items-center">
                <img
                  src={photo}
                  alt="User Cover"
                  className="border border-gray-400 p-2 mt-2 w-60 h-80"
                />
              </div>
            </div>
            <div className="flex justify-end items-end">
              <button className="back-button" onClick={navigation}>
                Go Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ViewUserDetails;
