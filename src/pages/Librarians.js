import React, { useState, useEffect } from "react";
import libraryAPI from "../utils/api";
import classes from "./users.module.css";
import { Link } from "react-router-dom";
import UserActionsDropdown from "../components/UI/UserActionsDropdown";
import Table from "../components/UI/tables/Table";

const Librarians = ({ userProfile }) => {
  const [librarians, setLibrarians] = useState([]);

  useEffect(() => {
    const fetchLibrarians = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await libraryAPI.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            role: "Bibliotekar",
          },
        });

        const librarianList = response.data.data;
        setLibrarians(librarianList);
      } catch (error) {
        console.error("Error fetching librarians:", error);
      }
    };

    fetchLibrarians();
  }, []); 

  const handleDeleteUser = (userId) => {
    const updatedLibrarians = librarians.filter((user) => user.id !== userId);
    setLibrarians(updatedLibrarians);
  };

  const tableHeaders = ["ID", "Name", "Email", "User Role", "Last Logged", "Actions"];
  const tableData = librarians
    .filter((item) => item.role === "Bibliotekar")
    .map((librarian) => [
      librarian.id,
      `${librarian.name} ${librarian.surname}`,
      librarian.email,
      librarian.role,
      librarian.lastLoggedTime,
      <UserActionsDropdown
        user={librarian}
        onDelete={() => handleDeleteUser(librarian.id)}
      />,
    ]);

  return (
    <div className={classes.users}>
      <h2>Librarians</h2>
      <Link to="/useraddform?role=Bibliotekar" className={classes.addButton}>
        Novi Bibliotekar
      </Link>

      <Table headers={tableHeaders} data={tableData} />
    </div>
  );
};

export default Librarians;
