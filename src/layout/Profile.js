import React, { useEffect, useState } from "react";
import libraryAPI from "../utils/api";
import classes from "./profile.module.css";

const Profile = ({ userId, token }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (token && userId) {
          const response = await libraryAPI.get(`/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json; charset=utf-8",
            },
          });

          const userData = response.data.data;
          console.log("User Data:", userData);
          setUserProfile(userData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId, token]);

  return (
    <div className={classes.profile}>
      <h2>Profile</h2>
      {isLoading ? (
        <p>Loading profile data...</p>
      ) : userProfile ? (
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
