import { useState, useEffect, useCallback } from 'react';
import libraryAPI from "../../utils/api";

function useUserDetails(userId) {
  const [user, setUser] = useState(null);

  const fetchUserDetails = useCallback(async () => {
    try {
       
      const response = await libraryAPI.get(`/users/${userId}`);
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
