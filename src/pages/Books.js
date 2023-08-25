import React, { useState, useEffect } from "react";
import libraryAPI from "../utils/api";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = sessionStorage.getItem("token"); 

        if (token) {
          const response = await libraryAPI.get("/books", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const fetchedBooks = response.data.data;
          setBooks(fetchedBooks);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
