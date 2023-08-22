import React, { useEffect, useState } from "react";
import libraryAPI from "../utils/api"; // Update the path accordingly

function Ucenici() {
  const [ucenici, setUcenici] = useState([]);

  useEffect(() => {
    // Make a GET request using libraryAPI instance to fetch all users
    libraryAPI.get("/users")
      .then(response => {
        // Filter users with role_id 2 (Ucenik)
        const ucenikUsers = response.data.filter(user => user.role_id === 2);
        setUcenici(ucenikUsers);
      })
      .catch(error => {
        console.error("Error fetching ucenici:", error);
      });
  }, []);

  return (
    <div>
      <h2>Ucenici</h2>
      <ul>
        {ucenici.map(ucenik => (
          <li key={ucenik.id}>{ucenik.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Ucenici;
