import React, { useEffect, useState } from 'react';
import ReusableTable from '../../../components/UI/tables/Table';
import { fetchBorrowedBooks } from '../../../queries/knjige/useBookBorrow';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { formatDistance, parseISO, format } from 'date-fns';
import Pagination from '../../../components/UI/pagination/Pagination';

const VraceneKnjigeTable = ({ searchTerm }) => {
  const [returnedBooks, setReturnedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const calculateDuration = (returnDate) => {
    if (!returnDate) {
      return '';
    }

    const returnDateParsed = parseISO(returnDate);
    const currentDate = new Date();
    const duration = formatDistance(returnDateParsed, currentDate);
    return duration;
  };

  useEffect(() => {
    setLoading(true);

    fetchBorrowedBooks()
      .then((data) => {
        setTimeout(() => {
          setReturnedBooks(data.vracene); 
          setLoading(false);
          console.log(data);
        }, 1000);
      })
      .catch((error) => {
        console.error('Error fetching returned books:', error);
        setLoading(false);
      });
  }, []);

  const filteredReturnedBooks = returnedBooks.filter((book) => {
    const searchString = `${book.knjiga.title} ${book.student.name} ${book.student.surname} ${book.return_date} ${calculateDuration(
      book.return_date
    )} ${book.bibliotekar0 ? `${book.bibliotekar0.name} ${book.bibliotekar0.surname}` : ''}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  const formatDate = (date) => {
    return date ? format(parseISO(date), 'yyyy-MM-dd') : '';
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const tableData = filteredReturnedBooks
  .slice(startIndex, endIndex)
  .map((book) => [
    book.knjiga.title,
    `${book.student.name} ${book.student.surname}`,
    formatDate(book.borrow_date), 
    formatDate(book.return_date),
    calculateDuration(book.return_date),
    book.bibliotekar0 ? `${book.bibliotekar0.name} ${book.bibliotekar0.surname}` : '',
  ]);

const customTableHead = [
  'Naziv knjige',
  'Vraćeno od ucenika',
  'Datum izdavanja', 
  'Datum vraćanja',
  'Zadrzavanje knjige',
  'Knjigu primio',
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
            totalItems={filteredReturnedBooks.length}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default VraceneKnjigeTable;
