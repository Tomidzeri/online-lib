import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDeleteBook from "../../../../queries/knjige/useDeleteBook";
import { TiTick } from "react-icons/ti";
import { GiCrossMark } from "react-icons/gi";

const DeleteBook = ({ book, onDelete }) => {
  const deleteBook = useDeleteBook();

  const handleDelete = () => {
    toast.warning(
      <>
        <div style={{ textAlign: "center" }}>
          <p>Da li ste sigurni da zelite da izbrisete knjigu:</p>
          <p>
            <span style={{ fontWeight: "bold", textAlign: "center" }}>
              {book.title}
            </span>
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <button
            onClick={() => {
              deleteBook(book.id);
              onDelete(book.id);
              toast.dismiss();
            }}
            style={{ color: "red" }}
          >
            <TiTick />
          </button>
          <button
            onClick={() => {
              toast.dismiss();
            }}
            style={{ color: "blue" }}
          >
            <GiCrossMark />
          </button>
        </div>
      </>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete book</button>
    </div>
  );
};

export default DeleteBook;
