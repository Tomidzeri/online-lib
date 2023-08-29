import React, { useState, useEffect } from "react";
import libraryAPI from "../utils/api";
import classes from "./users.module.css";
import { Link } from "react-router-dom";
import UserActionsDropdown from "../components/UI/UserActionsDropdown";

const Librarians = ({ userProfile }) => {
  const [librarians, setLibrarians] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

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
  }, []); // add dependancy if problems occur    

   const handleDeleteUser = (userId) => {
     const updatedLibrarians = librarians.filter((user) => user.id !== userId);
     setLibrarians(updatedLibrarians);
     setSelectedUser(null); 
   };

  return (
    <div className={classes.users}>
      <h2>Librarians</h2>
      <Link to="/useraddform?role=Bibliotekar" className={classes.addButton}>
        Novi Bibliotekar
      </Link>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>User Role</th>
            <th>Last Logged</th>
            <th>Actions</th>
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
                <td>
                  {/* Actions */}
                  <UserActionsDropdown
                    user={librarian}
                    onDelete={() => handleDeleteUser(librarian.id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Librarians;
