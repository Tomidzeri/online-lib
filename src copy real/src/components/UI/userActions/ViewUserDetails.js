import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import useUserDetails from '../../../queries/useUserDetails';
import './ViewUserDetails.css';

function ViewUserDetails() {
  const navigate = useNavigate(); 
  const { userId } = useParams();
  const user = useUserDetails(userId);

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  const goBackLink = user.role === 'Bibliotekar' ? '/librarians' : '/students';

  return (
    <div className="user-details">
      <h1>User Details</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>JMBG:</strong> {user.jmbg}</p>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Role:</strong> {user.role}</p>
      
      <button className="back-button" onClick={() => navigate(goBackLink)}>
        Go Back
      </button>
    </div>
  );
}

export default ViewUserDetails;
