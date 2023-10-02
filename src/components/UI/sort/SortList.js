import React, { useEffect, useState } from "react";
import { fetchBooks } from "../../../queries/knjige/fetchBooks";
import { fetchBorrowedBooks } from "../../../queries/knjige/useBookBorrow";
// import { useTable, useSortBy } from "react-table";

const SortList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("Svi"); // Default value
  const [loading, setLoading] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // For filtering borrowed books

  // Fetch books and update the state when the component mounts
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

  // Fetch borrowed books when the selected book changes
  useEffect(() => {
    if (selectedBook !== "Svi") {
      setLoading(true);
      fetchBorrowedBooks()
        .then((data) => {
          // Filter borrowed books based on the selected book's title
          const filteredBorrowedBooks = data.izdate.filter(
            (book) => book.knjiga.title === selectedBook
          );
          setBorrowedBooks(filteredBorrowedBooks);
          setLoading(false);
          console.log(data);
        })
        .catch((error) => {
          console.error("Error fetching borrowed books:", error);
          setLoading(false);
        });
    }
  }, [selectedBook]);

  // Handle dropdown selection
  const handleDropdownChange = (event) => {
    setSelectedBook(event.target.value);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Format borrowed book information
  const formatBorrowedBookInfo = (book) => {
    const librarianInfo = book.bibliotekar0
      ? `${book.bibliotekar0.name} ${book.bibliotekar0.surname}`
      : "";
    return `${librarianInfo} je izdao/la knjigu ${book.knjiga.title} uceniku ${book.student.name} ${book.student.surname} datuma ${book.borrow_date}`;
  };

  // Filter borrowed books based on search term
  const filteredBorrowedBooks = borrowedBooks.filter((book) => {
    const searchString = formatBorrowedBookInfo(book).toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <label htmlFor="bookDropdown">Knjige:</label>
      <select
        id="bookDropdown"
        value={selectedBook}
        onChange={handleDropdownChange}
      >
        <option value="Svi">Svi</option>
        {books.map((book) => (
          <option key={book.id} value={book.title}>
            {book.title}
          </option>
        ))}
      </select>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search borrowed books..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {selectedBook !== "Svi" && (
        <>
          {loading ? (
            <p>Loading borrowed books...</p>
          ) : (
            <ul>
              {filteredBorrowedBooks.map((book, index) => (
                <li key={index}>{formatBorrowedBookInfo(book)}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default SortList;