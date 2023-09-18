import React, { useEffect, useState } from 'react';
import ReusableTable from '../../components/UI/tables/Table';
import { fetchBooks } from '../../queries/fetchBooks';
import Button from '../../components/UI/buttons/Button';
import SearchBox from '../../components/UI/search/SearchBox';
import { BsSearch } from 'react-icons/bs';
import Pagination from '../../components/UI/pagination/Pagination';
import BookActionsDropdown from '../../components/UI/BookActionsDropdown';
import useDeleteBook from '../../queries/useDeleteBook';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const deleteBook = useDeleteBook();

  useEffect(() => {
    fetchBooks()
      .then((data) => {
        setBooks(data);
        console.log(data);
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
  const tableData = filteredBooks.slice(startIndex, endIndex).map((book) => [
    book.title,
    book.authors.map((author) => `${author.name} ${author.surname}`).join(', '), // izbrisati nakon brisanja prve dvije knjige, jer koriste dva autora
    book.categories.map((category) => category.name).join(', '),
    book.samples,
    book.rSamples,
    book.fSamples,
    // book.publisher,
    // book.genres,
    <BookActionsDropdown
      book={book}
      onDelete={() => handleDeleteBook(book.id)}
    />,
  ]);

  const customTableHead = [
    'Naziv Knjige',
    'Autor',
    'Kategorija',
    'Na Raspolaganju',
    'Rezervisano',
    'Izdato',
    // 'Izdavac',
    // 'Zanr',
  ];

  const handleDeleteBook = (bookId) => {
    deleteBook(bookId);
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
  };

  return (
    <div className="main-content z-10 mt-24 ml-20">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full pb-2 mb-2">
          <h2 className="text-2xl font-bold text-center">Knjige</h2>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-between w-full mb-2">
            <Button
              onClick={() =>
                (window.location.href = "/storebook")
              }
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-md"
            >
              Nova Knjiga
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BsSearch className="text-gray-600 text-lg" />
              <SearchBox
                onSearch={setSearchTerm}
                className="border border-gray-300 mb-2 px-2 py-2 rounded-md"
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
