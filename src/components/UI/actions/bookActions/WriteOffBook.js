import React, { useEffect, useState } from "react";
import ReusableTable from "../../tables/Table";
import { fetchBorrowedBooks } from "../../../../queries/knjige/useBookBorrow";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { formatDistance, parseISO, isAfter, format } from "date-fns";
import Pagination from "../../pagination/Pagination";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Button, Avatar } from "@mui/material";
import useBookDetails from "../../../../queries/knjige/useBookDetails";
import { useNavigate } from "react-router-dom";
import SearchBox from "../../search/SearchBox";
import { BsSearch } from "react-icons/bs";
import { writeOffBook } from "../../../../queries/knjige/useWriteOffBook"; // Import the writeOffBook function
import { toast } from "react-toastify";

const WriteOffBook = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { bookId } = useParams();
  const book = useBookDetails(bookId);
  const navigate = useNavigate();

  const calculateDuration = (borrowDate, returnDate) => {
    if (!borrowDate || !returnDate) {
      return "";
    }
  
    const borrowDateParsed = parseISO(borrowDate);
    const returnDateParsed = parseISO(returnDate);
    const currentDate = new Date();
  
    const duration = formatDistance(
      isAfter(currentDate, returnDateParsed) ? returnDateParsed : borrowDateParsed,
      currentDate
    );
  
    return isAfter(currentDate, returnDateParsed) ? (
      <span style={{ background: "red", color: "white", padding: "2px 4px" }}>
        {duration}
      </span>
    ) : (
      duration
    );
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

    if (searchTerm && !searchString.includes(searchTerm.toLowerCase())) {
      return false;
    }

    if (bookId && book.knjiga.id !== Number(bookId)) {
      return false;
    }

    return true;
  });

  const formatDate = (date) => {
    return date ? format(parseISO(date), "yyyy-MM-dd") : "";
  };

  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleResetCheckboxes = () => {
    setSelectedItems([]);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tableData = filteredBorrowedBooks
    .slice(startIndex, endIndex)
    .map((book) => [
      `${book.student.name} ${book.student.surname}`,
      formatDate(book.borrow_date),
      formatDistance(parseISO(book.return_date), parseISO(book.borrow_date)),
      calculateDuration(book.borrow_date, book.return_date),
      book.bibliotekar0
        ? `${book.bibliotekar0.name} ${book.bibliotekar0.surname}`
        : "",
      <input
        type="checkbox"
        key={uuidv4()}
        onChange={() => handleCheckboxChange(book.id)}
        checked={selectedItems.includes(book.id)}
      />,
    ]);

  const customTableHead = [
    "Izdato uceniku",
    "Datum izdavanja",
    "Trenutno zadrzavanje",
    "Prekoracenje u danima",
    "Knjigu izdao",
    "",
  ];

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      await writeOffBook(selectedItems); 

      if (selectedItems.length === 1) {
        toast.success("Knjiga je uspješno otpisana.", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.success("Knjige su uspješno otpisane.", {
          position: "top-center",
          autoClose: 3000,
        });
      }

      setBorrowedBooks((prevBorrowedBooks) =>
        prevBorrowedBooks.filter((book) => !selectedItems.includes(book.id))
      );

      setSelectedItems([]);
      setSubmitting(false);
    } catch (error) {
      console.error("Error writing off books:", error);

      toast.error("Došlo je do greške prilikom otpisivanja knjiga.", {
        position: "top-center",
        autoClose: 3000,
      });

      setSubmitting(false);
    }
  };

  const handleBackClick = () => {
    navigate(`/books`);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div className="mt-16 ml-20 flex flex-col content-between">
      <div className="w-full mb-80">
        <div className="border-b border-gray-300 w-full text-left flex flex-row">
          <div className="flex flex-row">
            <Avatar
              alt="Book Cover"
              src="https://tim2.petardev.live/img/book-cover-placeholder.png"
              sx={{ width: 60, height: 60, marginRight: 2 }}
            />
            <div className="flex flex-col">
              <h2 className="text-3xl font-semibold">{book?.title}</h2>
              <Button
                onClick={handleBackClick}
                variant="text"
                color="primary"
                sx={{ textTransform: "none", paddingLeft: 0 }}
              >
                Sve Knjige
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-4 mb-4">
          <h1 className="text-xl font-semibold">Otpiši knjigu</h1>
          <div className="flex items-center space-x-2">
            <BsSearch className="text-gray-600 text-lg" />
            <SearchBox
              type="text"
              onSearch={handleSearch}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="border border-gray-300 mb-2 px-2 py-2 rounded-md"
            />
          </div>
        </div>
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
      <div className="mt-4 mb-4 flex flex-row items-end justify-end gap-10">
        <Button
          variant="contained"
          color="primary"
          onClick={handleResetCheckboxes}
          style={{ backgroundColor: "red" }}
        >
          Ponisti
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedItems.length || submitting}
        >
          Otpiši knjigu
        </Button>
      </div>
    </div>
  );
};

export default WriteOffBook;
