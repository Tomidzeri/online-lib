import React, { useState, useEffect } from "react";
import libraryAPI from "../utils/api";
import classes from "./UserList.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
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
  }, [token]); 

  return (
    <div className={classes.users}>
      <h2>Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Total Copies</th>
            <th>Available Copies</th>
            <th>Rented Copies</th>
            <th>Reserved Copies</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.totalCopies}</td>
              <td>{book.availableCopies}</td>
              <td>{book.rentedCopies}</td>
              <td>{book.reservedCopies}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
