import React, { useState, useEffect } from "react";
import libraryAPI from "../utils/api";
import classes from "./users.module.css";
import UserAddForm from "../components/UI/forms/UserAddForm";

const Librarians = ({ userProfile }) => {
  const [librarians, setLibrarians] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchLibrarians = async () => {
      try {
        const token = localStorage.getItem("token");
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

  return (
    <div className={classes.users}>
      <h2>Librarians</h2>
      <button className={classes.addButton} onClick={() => setShowForm(true)}>
        Novi Bibliotekar
      </button>
      {showForm && (
        <UserAddForm role="Bibliotekar" onClose={() => setShowForm(false)} />
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>User Role</th>
            <th>Last Logged</th>
          </tr>
        </thead>
        <tbody>
          {librarians
            .filter((item) => item.role === "Bibliotekar")
            .map((librarian) => (
              <tr key={librarian.id}>
                <td>{librarian.id}</td>
                <td>{`${librarian.name} ${librarian.surname}`}</td>
                <td>{librarian.email}</td>
                <td>{librarian.role}</td>
                <td>{librarian.lastLoggedTime}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Librarians;
