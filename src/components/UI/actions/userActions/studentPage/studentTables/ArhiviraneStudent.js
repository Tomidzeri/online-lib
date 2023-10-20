import React, { useEffect, useState } from "react";
import ReusableTable from "../../../../tables/Table";
import BorrowsActionsDropdown from "../../../BorrowsActionsDropdown";
import { AllReservations } from "../../../../../../queries/knjige/useAllReservations";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { parseISO, addDays, format } from "date-fns";
import Pagination from "../../../../pagination/Pagination";
import { useParams } from "react-router-dom";

const ArhiviraneRezervacijeTable = ({ searchTerm }) => {
  const [archivedBooks, setArchivedBooks] = useState([]);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { userId } = useParams();

  console.log(userId);

  const calculateDuration = (reserveDate) => {
    if (!reserveDate) {
      return "";
    }

    const reserveDateParsed = parseISO(reserveDate);
    const currentDate = new Date();
    const expirationDate = addDays(reserveDateParsed, 5);

    const daysLeft = Math.max(
      0,
      Math.ceil((expirationDate - currentDate) / (1000 * 60 * 60 * 24))
    );

    if (daysLeft === 0) {
      return (
        <span style={{ background: "red", color: "white", padding: "2px 4px" }}>
          Isteklo
        </span>
      );
    } else {
      return (
        <span>
          {daysLeft} {daysLeft === 1 ? "dan" : "dana"} pre isteka
        </span>
      );
    }
  };

  useEffect(() => {
    setLoading(true);
  
    AllReservations()
      .then((data) => {
        setTimeout(() => {
          setArchivedBooks(data.archive);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching archived books:", error);
        setLoading(false);
      });
  }, []);

  const filteredArchivedBooks = archivedBooks
  .filter((book) => book.student.id === parseInt(userId, 10)) 
  .filter((book) => {
    const searchString = `${book.book_title} ${book.action_date} ${calculateDuration(book.action_date)}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });


  const formatDate = (date) => {
    return date ? format(parseISO(date), "yyyy-MM-dd") : "";
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tableData = filteredArchivedBooks
  .slice(startIndex, endIndex)
  .map((book) => [
    book.knjiga.title,
    formatDate(book.action_date),
    calculateDuration(book.action_date),
    book.bibliotekar0
      ? `${book.bibliotekar0.name} ${book.bibliotekar0.surname}`
      : "",
    book.status,
    <BorrowsActionsDropdown book={book} />,
  ]);

  const customTableHead = [
    "Naziv knjige",
    "Datum Rezervacije",
    "Rezervacija istice",
    "Rezervaciju podnio",
    "Status",
    "",
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
            totalItems={filteredArchivedBooks.length}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default ArhiviraneRezervacijeTable;
