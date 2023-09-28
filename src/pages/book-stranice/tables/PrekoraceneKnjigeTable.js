import React, { useEffect, useState } from "react";
import ReusableTable from "../../../components/UI/tables/Table";
import BorrowsActionsDropdown from "../../../components/UI/actions/BorrowsActionsDropdown";
import { fetchBorrowedBooks } from "../../../queries/knjige/useBookBorrow";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { formatDistance, parseISO, isAfter, format, differenceInDays } from "date-fns";
import Pagination from "../../../components/UI/pagination/Pagination";

const PrekoraceneKnjigeTable = ({ searchTerm }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const calculateDuration = (borrowDate, returnDate) => {
    if (!borrowDate || !returnDate) {
      return "";
    }

    const borrowDateParsed = parseISO(borrowDate);
    const returnDateParsed = parseISO(returnDate);
    const currentDate = new Date();

    if (isAfter(currentDate, returnDateParsed)) {
      const duration = formatDistance(returnDateParsed, borrowDateParsed);
      return (
        <span
          style={{ background: "red", color: "white", padding: "2px 4px" }}
        >
          {duration}
        </span>
      );
    } else {
      const duration = formatDistance(borrowDateParsed, currentDate);
      return `${duration}`;
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchBorrowedBooks()
      .then((data) => {
        setTimeout(() => {
          setBorrowedBooks(data.prekoracene);
          setLoading(false);
          console.log(data);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching borrowed books:", error);
        setLoading(false);
      });
  }, []);

  const filteredBorrowedBooks = borrowedBooks.filter((book) => {
    const searchString = `${book.knjiga.title} ${book.student.name} ${
      book.student.surname
    } ${book.borrow_date} ${book.return_date} ${calculateDuration(
      book.borrow_date,
      book.return_date
    )} ${
      book.bibliotekar0
        ? `${book.bibliotekar0.name} ${book.bibliotekar0.surname}`
        : ""
    }`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  const formatDate = (date) => {
    return date ? format(parseISO(date), "yyyy-MM-dd") : "";
  };

  const calculateOverdueDays = (returnDate) => {
    if (!returnDate) {
      return "";
    }

    const returnDateParsed = parseISO(returnDate);
    const currentDate = new Date();

    if (isAfter(currentDate, returnDateParsed)) {
      return differenceInDays(currentDate, returnDateParsed);
    } else {
      return 0;
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tableData = filteredBorrowedBooks
    .slice(startIndex, endIndex)
    .map((book) => [
      book.knjiga.title,
      formatDate(book.borrow_date),
      `${book.student.name} ${book.student.surname}`,
      calculateOverdueDays(book.return_date),
      calculateDuration(book.borrow_date, book.return_date),
      <BorrowsActionsDropdown book={book} />,
    ]);

  const customTableHead = [
    "Naziv knjige",
    "Datum izdavanja",
    "Izdato uceniku",
    "Prekoracenje u danima",
    "Trenutno zadrzavanje knjige",
    "Opcije",
  ];

  return (
    <div className="w-full">
      {loading ? (
        <div className="flex items-center justify-center h-72">
          <AiOutlineLoading3Quarters className="text-red-500 text-4xl animate-spin" />
        </div>
      ) : (
        <>
          <ReusableTable tableHead={customTableHead} tableData={tableData} />
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredBorrowedBooks.length}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default PrekoraceneKnjigeTable;
