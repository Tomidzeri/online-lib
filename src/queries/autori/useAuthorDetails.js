import libraryAPI from "../../utils/api";
import { useState, useEffect, useCallback } from 'react';

function useAuthorDetails(authorId) {
  const [author, setAuthor] = useState(null);

  const fetchAuthorDetails = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await libraryAPI.get(`/authors/${authorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuthor(response.data.data);
    } catch (error) {
      console.error("Error fetching author details:", error);
    }
  }, [authorId]);

  useEffect(() => {
    fetchAuthorDetails();
  }, [fetchAuthorDetails]);

  return author;
}

export default useAuthorDetails;
