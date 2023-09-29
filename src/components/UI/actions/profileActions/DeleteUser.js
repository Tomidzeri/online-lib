import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDeleteUser from "../../../../queries/korisnici/useDeleteUser";
import { useParams, useNavigate } from "react-router-dom";

const DeleteUser = ({ user, onDelete }) => {
  const deleteUser = useDeleteUser();
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      deleteUser(userId);

      toast.success("Korisnik je uspješno izbrisan.", {
        autoClose: 3000,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Delete user error:", error);

      toast.error("Greška prilikom brisanja korisnika.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="delete">
      <button onClick={handleDelete}>Izbriši korisnika</button>
    </div>
  );
};

export default DeleteUser;
