import React, { useEffect, useState } from "react";
import ReusableTable from "../../../components/UI/tables/Table";
import { fetchBorrowedBooks } from "../../../queries/knjige/useBookBorrow";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { formatDistance, parseISO, isAfter, format } from "date-fns";
import Pagination from "../../../components/UI/pagination/Pagination";
import IzdateActionsDropdown from "../../../components/UI/actions/borrowActions/IzdateActions";

const IzdateKnjigeTable = ({ searchTerm }) => {
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
          setBorrowedBooks(data.izdate);
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tableData = filteredBorrowedBooks
    .slice(startIndex, endIndex)
    .map((book) => [
      book.knjiga.title,
      `${book.student.name} ${book.student.surname}`,
      formatDate(book.borrow_date),
      formatDate(book.return_date),
      calculateDuration(book.borrow_date, book.return_date),
      book.bibliotekar0
        ? `${book.bibliotekar0.name} ${book.bibliotekar0.surname}`
        : "",
      <IzdateActionsDropdown book={book} id={book.id}  />,
    ]);

  const customTableHead = [
    "Naziv knjige",
    "Izdato uceniku",
    "Datum izdavanja",
    "Datum vracanja",
    "Trenutno zadrzavanje knjige",
    "Knjigu izdao",
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

export default IzdateKnjigeTable;
