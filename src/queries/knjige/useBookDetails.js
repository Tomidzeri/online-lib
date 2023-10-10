import libraryAPI from "../../utils/api";
import { useState, useEffect, useCallback } from "react";

function useBookDetails(bookId) {
  const [book, setBook] = useState(null);

  const fetchBookDetails = useCallback(async () => {
    try {
      const response = await libraryAPI.get(`/books/${bookId}`);
      setBook(response.data.data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  }, [bookId]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  return book;
}

export default useBookDetails;
