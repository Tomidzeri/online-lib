import React, { useEffect, useState } from "react";
import { fetchBorrowedBooks } from "../../../queries/knjige/useBookBorrow";
import BookDropdown from "./BookDropdown";
import StudentDropdown from "./StudentDropdown";
import LibrariansDropdown from "./LibrarianDropdown";

const SortList = () => {
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedLibrarian, setSelectedLibrarian] = useState("");
  const [selectedSortCategory, setSelectedSortCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchBorrowedBooks()
      .then((data) => {
        const izdateBooks = data.izdate || [];
        const otpisaneBooks = data.otpisane || [];
        const vraceneBooks = data.vracene || [];
        const prekoraceneBooks = data.prekoracene || [];

        const allBorrowedBooks = [
          ...izdateBooks,
          ...otpisaneBooks,
          ...vraceneBooks,
          ...prekoraceneBooks,
        ];

        let filteredBorrowedBooks = [...allBorrowedBooks];

        if (selectedBook) {
          filteredBorrowedBooks = filteredBorrowedBooks.filter(
            (book) => book.knjiga?.title === selectedBook
          );
        }

        if (selectedStudent) {
          filteredBorrowedBooks = filteredBorrowedBooks.filter(
            (book) => book.student?.name === selectedStudent
          );
        }

        if (selectedLibrarian) {
          filteredBorrowedBooks = filteredBorrowedBooks.filter(
            (book) => book.librarian?.name === selectedLibrarian
          );
        }

        if (selectedSortCategory === "") {
          // Handle the case when no sorting option is selected
          setBorrowedBooks(allBorrowedBooks);
        } else {
          setBorrowedBooks(filteredBorrowedBooks);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching borrowed books:", error);
        setLoading(false);
      });
  }, [selectedBook, selectedStudent, selectedLibrarian, selectedSortCategory]);

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
  };

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const handleLibrarianChange = (event) => {
    setSelectedLibrarian(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const formatBorrowedBookInfo = (book) => {
    let sentence = "";

    if (selectedSortCategory === "izdate") {
      sentence = `${book.librarian?.name} ${book.librarian?.surname} je izdao/la knjigu ${book.knjiga.title} uceniku ${book.student.name} ${book.student.surname} datuma ${book.borrow_date}`;
    } else if (selectedSortCategory === "otpisane") {
      sentence = `${book.librarian?.name} ${book.librarian?.surname} je otpisao/la knjigu ${book.knjiga.title} koja je bila izdata uceniku ${book.student.name} ${book.student.surname} datuma ${book.borrow_date}`;
    } else if (selectedSortCategory === "vracene") {
      sentence = `Ucenik ${book.student.name} ${book.student.surname} je vratio/la knjigu ${book.knjiga.title} izdatu od strane ${book.librarian?.name} ${book.librarian?.surname} datuma ${book.return_date}`;
    }

    return sentence;
  };

  const filteredBorrowedBooks = borrowedBooks.filter((book) => {
    const searchString = formatBorrowedBookInfo(book).toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  const handleSortChange = (event) => {
    setSelectedSortCategory(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <BookDropdown
          selectedBook={selectedBook}
          handleBookChange={handleBookChange}
        />

        <StudentDropdown
          selectedStudent={selectedStudent}
          handleStudentChange={handleStudentChange}
        />

        <LibrariansDropdown
          selectedLibrarian={selectedLibrarian}
          handleLibrarianChange={handleLibrarianChange}
        />

        <div className="flex">
          <label>Transakcije:</label>
          <select value={selectedSortCategory} onChange={handleSortChange}>
            <option value="">Sve</option>
            <option value="izdate">Izdate</option>
            <option value="otpisane">Otpisane</option>
            <option value="prekoracene">Prekoracene</option>
            <option value="vracene">Vracene</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search borrowed books..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {(selectedBook !== "Svi" ||
        selectedStudent !== "Svi" ||
        selectedLibrarian !== "Svi") && (
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
