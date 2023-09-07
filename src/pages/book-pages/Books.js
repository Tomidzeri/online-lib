import React, { useEffect, useState } from 'react';
import classes from './books.module.css';
import Table from '../../components/UI/tables/Table';
import { fetchBooks } from '../../queries/fetchBooks';
import Button from '../../components/UI/buttons/Button';
import SearchBox from '../../components/UI/search/SearchBox';
import { BsSearch } from 'react-icons/bs';
import Pagination from '../../components/UI/pagination/Pagination';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchBooks()
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  const ITEMS_PER_PAGE = 8; 

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredBooks.length;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleTableData = filteredBooks.slice(startIndex, endIndex);

  const tableHeaders = ['Title', 'Author', 'Genre', 'Price'];

  return (
    <div className={classes.books}>
      <div className={classes.header}>
        <div className={classes.titleContent}>
          <h2 className={classes.title}>Knjige</h2>
          <div className={classes.under_header}>
            <Button
              onClick={() =>
                (window.location.href = '/create-book')
              }
            >
              Nova Knjiga
            </Button>
            <div className={classes.search}>
              <BsSearch className={classes.search_icon} />
              <SearchBox
                onSearch={setSearchTerm}
                className={classes.search_box}
              />
            </div>
          </div>
        </div>
      </div>
      <Table headers={tableHeaders} data={visibleTableData} />
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
};

export default Books;
