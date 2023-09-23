import React from "react";
import useDeleteBook from "../../../../queries/knjige/useDeleteBook";

const DeleteBook = ({ book, onDelete }) => {
  const deleteBook = useDeleteBook(); 

  const handleDelete = () => {
    deleteBook(book.id); 
    onDelete(book.id); 
  };

  return (
    <div>
      {/* <p>Are you sure you want to delete {book.name}?</p> */}
      <button onClick={handleDelete}>Delete book</button>
    </div>
  );
};

export default DeleteBook;
