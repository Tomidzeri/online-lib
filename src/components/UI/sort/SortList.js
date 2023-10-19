import React, { useEffect, useState } from "react";
import { fetchBorrowedBooks } from "../../../queries/knjige/useBookBorrow";
import BookDropdown from "./BookDropdown";
import StudentDropdown from "./StudentDropdown";
import LibrariansDropdown from "./LibrarianDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "../pagination/Pagination";
import { Link } from "react-router-dom";
import "./styles.css";

const SortList = () => {
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedLibrarian, setSelectedLibrarian] = useState("");
  const [selectedSortCategory, setSelectedSortCategory] = useState("izdate");
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [izdateBooks, setIzdateBooks] = useState([]);
  const [otpisaneBooks, setOtpisaneBooks] = useState([]);
  const [vraceneBooks, setVraceneBooks] = useState([]);
  const [prekoraceneBooks, setPrekoraceneBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await fetchBorrowedBooks();
        setIzdateBooks(data.izdate || []);
        setOtpisaneBooks(data.otpisane || []);
        setVraceneBooks(data.vracene || []);
        setPrekoraceneBooks(data.prekoracene || []);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredBorrowedBooks = [];

    if (selectedSortCategory === "izdate") {
      filteredBorrowedBooks = izdateBooks;
    } else if (selectedSortCategory === "otpisane") {
      filteredBorrowedBooks = otpisaneBooks;
    } else if (selectedSortCategory === "vracene") {
      filteredBorrowedBooks = vraceneBooks;
    } else if (selectedSortCategory === "prekoracene") {
      filteredBorrowedBooks = prekoraceneBooks;
    } else {
      filteredBorrowedBooks = [
        ...izdateBooks,
        ...otpisaneBooks,
        ...vraceneBooks,
        ...prekoraceneBooks,
      ];
    }

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
        (book) => book.bibliotekar0?.name === selectedLibrarian
      );
    }

    console.log(filteredBorrowedBooks);

    setBorrowedBooks(filteredBorrowedBooks);
  }, [
    selectedBook,
    selectedStudent,
    selectedLibrarian,
    selectedSortCategory,
    izdateBooks,
    otpisaneBooks,
    vraceneBooks,
    prekoraceneBooks,
  ]);

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

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const sortedBooks = filteredBorrowedBooks.slice().sort((a, b) => {
      const dateA = new Date(a.borrow_date);
      const dateB = new Date(b.borrow_date);

      if (selectedDate === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setBorrowedBooks(sortedBooks);
  };

  const formatAdditionalInfo = (book) => {
    let additionalInfo = "";
    let actionType = "";

    if (selectedSortCategory === "izdate") {
      actionType = "IZDAVANJE KNJIGE";
    } else if (selectedSortCategory === "otpisane") {
      actionType = "OTPISANE KNJIGE";
    } else if (selectedSortCategory === "vracene") {
      actionType = "VRACENE KNJIGE";
    } else if (selectedSortCategory === "prekoracene") {
      actionType = "PREKORACENE KNJIGE";
    }

    if (actionType) {
      additionalInfo = `${actionType} - ${getElapsedTime(
        book.borrow_date
      )} ago`;
    }

    return additionalInfo;
  };

  const getElapsedTime = (dateString) => {
    const currentDate = new Date();
    const eventDate = new Date(dateString);
    const timeDifference = currentDate - eventDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 3600 * 24));
    return `${daysAgo} days ago`;
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatBorrowedBookInfo = (book) => {
    let sentence = "";
  
    if (selectedSortCategory === "izdate") {
      sentence = (
        <span>
          <Link to={`/viewuserdetails/${book.bibliotekar0.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            {book.bibliotekar0?.name} {book.bibliotekar0?.surname}
          </Link>{" "}
          je izdao/la knjigu{" "}
          <Link to={`/viewbook/${book.knjiga.id}`} style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>
            {book.knjiga.title}
          </Link>{" "}
          uceniku{" "}
          <Link to={`/viewuserdetails/${book.student.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            {book.student.name} {book.student.surname}
          </Link>{" "}
          datuma {formatDate(book.borrow_date)}
        </span>
      );
    } else if (selectedSortCategory === "otpisane") {
      sentence = (
        <span>
          <Link to={`/viewuserdetails/${book.bibliotekar0.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            {book.bibliotekar0?.name} {book.bibliotekar0?.surname}
          </Link>{" "}
          je otpisao/la knjigu{" "}
          <Link to={`/viewbook/${book.knjiga.id}`} style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>
            {book.knjiga.title}
          </Link>{" "}
          koja je bila izdata uceniku{" "}
          <Link to={`/viewuserdetails/${book.student.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            {book.student.name} {book.student.surname}
          </Link>{" "}
          datuma {formatDate(book.borrow_date)}
        </span>
      );
    } else if (selectedSortCategory === "vracene") {
      sentence = (
        <span>
          Ucenik{" "}
          <Link to={`/viewuserdetails/${book.student.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            {book.student.name} {book.student.surname}
          </Link>{" "}
          je vratio/la knjigu{" "}
          <Link to={`/viewbook/${book.knjiga.id}`} style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>
            {book.knjiga.title}
          </Link>{" "}
          izdatu od strane{" "}
          <Link to={`/viewuserdetails/${book.bibliotekar0.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            {book.bibliotekar0?.name} {book.bibliotekar0.surname}
          </Link>{" "}
          datuma {formatDate(book.borrow_date)}
        </span>
      );
    }
  
    return sentence;
  };
  

  const filteredBorrowedBooks = borrowedBooks.filter((book) => {
    const info = formatBorrowedBookInfo(book);
    const searchString = info ? info.toString().toLowerCase() : "";
    return searchString.includes(searchTerm.toLowerCase());
  });

  const handleSortChange = (event) => {
    setSelectedSortCategory(event.target.value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleBooks = filteredBorrowedBooks.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col">
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <BookDropdown
            selectedBook={selectedBook}
            handleBookChange={handleBookChange}
          />
        </div>

        <div className="flex-1">
          <StudentDropdown
            selectedStudent={selectedStudent}
            handleStudentChange={handleStudentChange}
          />
        </div>

        <div className="flex-1">
          <LibrariansDropdown
            selectedLibrarian={selectedLibrarian}
            handleLibrarianChange={handleLibrarianChange}
          />
        </div>

        <div className="flex-1">
          <label className="text-gray-600">Transakcije:</label>
          <select
            value={selectedSortCategory}
            onChange={handleSortChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Sve</option>
            <option value="izdate">Izdate</option>
            <option value="otpisane">Otpisane</option>
            <option value="prekoracene">Prekoracene</option>
            <option value="vracene">Vracene</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600">Sort po datumu:</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="w-full border rounded-md p-2"
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="flex justify-end items-end">
          <input
            type="text"
            placeholder="Pretrazi aktivnosti..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full border rounded-md p-2"
          />
        </div>
      </div>

      {(selectedBook !== "Svi" ||
        selectedStudent !== "Svi" ||
        selectedLibrarian !== "Svi" ||
        selectedSortCategory !== "Sve") && (
        <>
          {loading ? (
            <p className="text-gray-600">Ucitavanje aktivnosti...</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {visibleBooks.map((book, index) => (
                <li key={index} className="bg-white rounded-md shadow-md p-4">
                  {formatAdditionalInfo(book)}
                  <br />
                  {formatBorrowedBookInfo(book)}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filteredBorrowedBooks.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default SortList;
