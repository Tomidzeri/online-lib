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
    <div className="flex-1">
      <label htmlFor="bookDropdown" className="text-gray-600">
        Knjige:
      </label>
      <select
        id="bookDropdown"
        value={selectedBook}
        onChange={handleBookChange}
        className="w-full border rounded-md p-2"
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
