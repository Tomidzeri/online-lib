import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useUserDetails from '../../../queries/useUserDetails';
import './ViewUserDetails.css';

function ViewUserDetails() {
  const { userId } = useParams();
  const user = useUserDetails(userId);

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
