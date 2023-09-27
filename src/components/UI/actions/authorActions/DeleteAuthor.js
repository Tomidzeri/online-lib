import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDeleteAuthor from "../../../../queries/autori/useDeleteAuthor";
import { TiTick } from "react-icons/ti";
import { GiCrossMark } from "react-icons/gi";

const DeleteAuthor = ({ author, onDelete }) => {
  const deleteAuthor = useDeleteAuthor();

  const handleDelete = () => {
    toast.warning(
      <>
        <div style={{ textAlign: "center" }}>
          <p>Da li ste sigurni da zelite da izbrisete autora:</p>
          <p>
            <span style={{ fontWeight: "bold", textAlign: "center" }}>
              {author.name} {author.surname} ?
            </span>
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <button
            onClick={() => {
              deleteAuthor(author.id);
              onDelete(author.id);
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
      <button onClick={handleDelete}>Izbrisi autora</button>
    </div>
  );
};

export default DeleteAuthor;
