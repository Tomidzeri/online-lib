import React from 'react';
import BookForm from '../../components/UI/forms/BookForm';
import { createBook } from '../../queries/useCreateBook';
import classes from "./books.module.css";

const CreateBook = () => {
  const handleCreateBook = async (bookData) => {
    try {
      // Call the createBook function to create a new book
      await createBook(bookData);
      // Redirect to the books page or do any other necessary actions
    } catch (error) {
      console.error('Error creating book:', error);
      // Handle error as needed
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
