import React, { useEffect, useState } from 'react';
import classes from "./books.module.css";
import Table from "../../components/UI/tables/Table";
import { fetchBooks } from '../../queries/fetchBooks';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch books when the component mounts
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

  const tableHeaders = ['Title', 'Author', 'Genre', 'Price'];

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table headers={tableHeaders} data={books.map((book) => Object.values(book))} />
      )}
    </div>
  );
};

export default Books;
