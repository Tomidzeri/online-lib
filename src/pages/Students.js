import React, { useState, useEffect } from "react";
import libraryAPI from "../utils/api";
import classes from "./users.module.css";
import UserAddForm from "../components/UI/forms/UserAddForm";

const Students = ({ userProfile }) => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await libraryAPI.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            role_id: 2,
          },
        });

        const studentList = response.data.data;
        setStudents(studentList);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className={classes.users}>
      <h2>Students</h2>
      <button className={classes.addButton} onClick={() => setShowForm(true)}>
        Novi Ucenik
      </button>
      {showForm && (
        <UserAddForm role="Ucenik" onClose={() => setShowForm(false)} />
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students
            .filter((item) => item.role === "Učenik")
            .map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
