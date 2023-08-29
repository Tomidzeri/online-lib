import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import libraryAPI from "../../../utils/api";
import './ViewUserDetails.css'; 

function ViewUserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const token = sessionStorage.getItem("token");
        const response = await libraryAPI.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }

    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-details">
      <h1>User Details</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>JMBG:</strong> {user.jmbg}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Role:</strong> {user.role}</p>
      
      {user.role === 'Bibliotekar' ? (
        <Link className="back-button" to="/librarians">Go Back</Link>
      ) : (
        <Link className="back-button" to="/students">Go Back</Link>
      )}
    </div>
  );
}

export default ViewUserDetails;
