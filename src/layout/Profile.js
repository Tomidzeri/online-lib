import React, { useEffect, useState } from "react";
import libraryAPI from "../utils/api"; 
import classes from "./profile.module.css";


const Profile = ({ token }) => { // Removed userId prop
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await libraryAPI.get(`/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json; charset=utf-8",
          },
        });

        const userData = response.data; // Remove ".data" to access the entire response data
        console.log("User Data:", userData);
        setUserProfile(userData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };

    fetchUserProfile(); // Just fetch the profile using the token
  }, [token]);

  return (
    <div className={classes.profile}>
      <h2>Profile</h2>
      {isLoading ? (
        <p>Loading profile data...</p>
      ) : setUserProfile ? (
        <>
          <p>Name: {userProfile.name}</p>
          <p>Surname: {userProfile.surname}</p>
          <p>Email: {userProfile.email}</p>
          <p>Role: {userProfile.role}</p>
        </>
      ) : (
        <p>Failed to load profile data.</p>
      )}
    </div>
  );
};

export default Profile;
