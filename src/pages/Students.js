import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import libraryAPI from "../utils/api";
import classes from "./users.module.css";
import UserActionsDropdown from "../components/UI/UserActionsDropdown";

const Students = ({ userProfile }) => {
  const [students, setStudents] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await libraryAPI.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            role: "Učenik",
          },
        });

        const studentList = response.data.data;
        setStudents(studentList);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [selectedUser]); // remove dependancy if problems occur

  const handleDeleteUser = (userId) => {
    const updatedStudents = students.filter((user) => user.id !== userId);
    setStudents(updatedStudents);
    setSelectedUser(null); 
  };

  return (
    <div className={classes.users}>
      <h2>Students</h2>
      <Link to="/useraddform?role=Učenik" className={classes.addButton}>
        Novi Učenik
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
          {students
            .filter((item) => item.role === "Učenik")
            .map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.role}</td>
                <td>{student.lastLoggedTime}</td>
                <td>
                  {/* Actions */}
                  <UserActionsDropdown
                    user={student}
                    onDelete={() => handleDeleteUser(student.id)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
