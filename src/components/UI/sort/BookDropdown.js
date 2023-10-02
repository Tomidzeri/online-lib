import React, { useEffect, useState } from "react";
import { fetchBooks } from "../../../queries/knjige/fetchBooks";

const BookDropdown = ({ selectedBook, handleBookChange }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooksData() {
      try {
        const fetchedBooks = await fetchBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchBooksData();
  }, []);

  return (
    <div>
      <label htmlFor="bookDropdown">Knjige:</label>
      <select
        id="bookDropdown"
        value={selectedBook}
        onChange={handleBookChange}
      >
        <option value="Svi">Svi</option>
        {books.map((book) => (
          <option key={book.id} value={book.title}>
            {book.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BookDropdown;
