import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import libraryAPI from "../utils/api";
import classes from "./users.module.css";
import UserActionsDropdown from "../components/UI/UserActionsDropdown";
import Table from "../components/UI/tables/Table";

const Students = ({ userProfile }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = sessionStorage.getItem("token");
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
  }, []);

  const handleDeleteUser = (userId) => {
    const updatedStudents = students.filter((user) => user.id !== userId);
    setStudents(updatedStudents);
  };

  const tableHeaders = ["ID", "Name", "Email", "User Role", "Last Logged", "Actions"];
  const tableData = students
    .filter((item) => item.role === "Učenik")
    .map((student) => [
      student.id,
      student.name,
      student.email,
      student.role,
      student.lastLoggedTime,
      <UserActionsDropdown
        user={student}
        onDelete={() => handleDeleteUser(student.id)}
      />,
    ]);

  return (
    <div className={classes.users}>
      <h2>Students</h2>
      <Link to="/useraddform?role=Učenik" className={classes.addButton}>
        Novi Učenik
      </Link>

      <Table headers={tableHeaders} data={tableData} />
    </div>
  );
};

export default Students;
