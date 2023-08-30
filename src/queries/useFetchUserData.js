import { useState, useEffect } from 'react';
import libraryAPI from "../utils/api";

function useFetchUserData(userId) {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "", // Provide a default value for password
    password_confirmation: "", // Provide a default value for password_confirmation
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await libraryAPI.get(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Use the spread operator to merge fetched data with defaults
        setUser((prevUser) => ({ ...prevUser, ...response.data.data }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  return [user, setUser];
}

export default useFetchUserData;