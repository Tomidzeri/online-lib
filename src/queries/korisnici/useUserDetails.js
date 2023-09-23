import { useState, useEffect, useCallback } from 'react';
import libraryAPI from "../../utils/api";

function useUserDetails(userId) {
  const [user, setUser] = useState(null);

  const fetchUserDetails = useCallback(async () => {
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
  }, [userId]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return user;
}

export default useUserDetails;
