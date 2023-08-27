import React, { useState, useEffect } from "react";
import libraryAPI from "../utils/api";
import classes from "./UserList.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Exit early if token is not available
    if (!token) {
      setIsLoading(false);
      return;
    }

    const fetchBooks = async () => {
      try {
        const response = await libraryAPI.get("/books", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedBooks = response.data.data;
        setBooks(fetchedBooks);
        setIsLoading(false); // Data has been fetched, loading is done
      } catch (error) {
        console.error("Error fetching books:", error);
        setIsLoading(false); // Loading is done even if there's an error
      }
    };

    fetchBooks();
  }, [token]);

  return (
    <div className={classes.users}>
      <h2>Books</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
          {books
            .filter((item) => item.id > 0)
            .map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
              </tr>
            ))}
        </tbody>
        </table>
      )}
    </div>
  );
};

export default Books;
