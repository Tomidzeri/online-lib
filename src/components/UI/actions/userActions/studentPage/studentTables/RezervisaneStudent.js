import React, { useEffect, useState } from "react";
import ReserveActionsDropdown from "../../../../actions/ReserveActionsDropdown";
import { AllReservations } from "../../../../../../queries/knjige/useAllReservations";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { parseISO, addDays, format } from "date-fns";
import Pagination from "../../../../pagination/Pagination";
import ReusableTable from "../../../../tables/Table";
import { useParams } from "react-router-dom";

const RezervacijeKnjigaTable = ({ searchTerm }) => {
  const [reservedBooks, setReservedBooks] = useState([]);
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
          setReservedBooks(data.active);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching reserved books:", error);
        setLoading(false);
      });
  }, []);

  const filteredReservedBooks = reservedBooks
  .filter((book) => book.student_id === parseInt(userId, 10)) 
  .filter((book) => {
    const searchString = `${book.book_title} ${book.student_id} ${
      book.action_date
    } ${calculateDuration(book.action_date)}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });


  const formatDate = (date) => {
    return date ? format(parseISO(date), "yyyy-MM-dd") : "";
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tableData = filteredReservedBooks
    .slice(startIndex, endIndex)
    .map((book) => [
      book.knjiga.title,
      `${book.student.name} ${book.student.surname}`,
      formatDate(book.action_date),
      calculateDuration(book.action_date),
      book.bibliotekar0
        ? `${book.bibliotekar0.name} ${book.bibliotekar0.surname}`
        : "",
      book.status,
      <ReserveActionsDropdown book={book} />,
    ]);

  const customTableHead = [
    "Naziv knjige",
    "Izdato uceniku",
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
            totalItems={filteredReservedBooks.length}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default RezervacijeKnjigaTable;
