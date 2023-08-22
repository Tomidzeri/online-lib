import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import libraryAPI from "../utils/api";

function Bibliotekari() {
  const { role_id } = useParams(); // Get the role_id parameter from the URL
  const [bibliotekari, setBibliotekari] = useState([]);

  useEffect(() => {
    libraryAPI.get("/users")
      .then(response => {
        const bibliotekarUsers = response.data.filter(user => user.role_id === Number(role_id));
        setBibliotekari(bibliotekarUsers);
      })
      .catch(error => {
        console.error("Error fetching bibliotekari:", error);
      });
  }, [role_id]); // Include role_id in the dependency array

  return (
    <div>
      <h2>Bibliotekari</h2>
      <ul>
        {bibliotekari.map(bibliotekar => (
          <li key={bibliotekar.id}>{bibliotekar.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Bibliotekari;
