import React, { useEffect, useState } from 'react';
import ReusableTable from '../../components/UI/tables/Table';
import { fetchBooks } from '../../queries/fetchBooks';
import Button from '../../components/UI/buttons/Button';
import SearchBox from '../../components/UI/search/SearchBox';
import { BsSearch } from 'react-icons/bs';
import Pagination from '../../components/UI/pagination/Pagination';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const ITEMS_PER_PAGE = 8; 

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredBooks.length;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const tableData = filteredBooks.slice(startIndex, endIndex);

  const customTableHead = [
    'Naziv Knjige',
    'Autor',
    'Kategorija',
    'Na Raspolaganju',
    'Rezervisano',
    'Izdato',
    'U prekoracenju',
    'Ukupna Kolicina',
  ];

  return (
    <div className="main-content z-10 mt-24 ml-20">
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Books</h2>
            <Button
              onClick={() => (window.location.href = '/store-book')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              New Book
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BsSearch className="text-gray-600 text-lg" />
              <SearchBox
                onSearch={setSearchTerm}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>

        <ReusableTable tableHead={customTableHead} tableData={tableData} />
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default Books;
