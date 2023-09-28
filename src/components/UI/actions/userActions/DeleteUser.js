import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDeleteUser from "../../../../queries/korisnici/useDeleteUser";
import { TiTick } from "react-icons/ti";
import { GiCrossMark } from "react-icons/gi";
import './DeleteUser.css';

const DeleteUser = ({ user, onDelete }) => {
  const deleteUser = useDeleteUser();

  const handleDelete = () => {
    toast.warning(
      <>
        <div style={{ textAlign: "center" }}>
          <p>Da li ste sigurni da zelite da izbrisete korisnika:</p>
          <p>
            <span style={{ fontWeight: "bold", textAlign: "center" }}>
              {user.name} {user.surname}
            </span>
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <button
            onClick={() => {
              deleteUser(user.id);
              onDelete(user.id);
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
    <div className="delete">
      <button onClick={handleDelete}>Izbrisi korisnika</button>
    </div>
  );
};

export default DeleteUser;
