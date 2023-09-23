import React from 'react';
import BookForm from '../../components/UI/forms/BookForm';
import { createBook } from '../../queries/useCreateBook';
import classes from "./books.module.css";

const CreateBook = () => {
  const handleCreateBook = async (bookData) => {
    try {
      await createBook(bookData);
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <div className={classes.create_book_container}>
      <h2>Create New Book</h2>
      <BookForm onSubmit={handleCreateBook} />
    </div>
  );
};

export default CreateBook;
