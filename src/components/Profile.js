import React, { useEffect, useState } from "react";
import libraryAPI from "../utils/api";

function ProfileContent() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      libraryAPI.post("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUserData(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
    }
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {userData && (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Display other user data as needed */}
        </div>
      )}
    </div>
  );
}

export default ProfileContent;
