import React, { useState } from "react";
import classes from "./users.module.css";
import UserActionsDropdown from "../../components/UI/UserActionsDropdown";
import Table from "../../components/UI/tables/Table";
import useFetchStudents from "../../queries/useFetchStudents";
import Button from "../../components/UI/buttons/Button";
import SearchBox from "../../components/UI/search/SearchBox";
import { BsSearch } from "react-icons/bs";
import Pagination from "../../components/UI/pagination/Pagination"; // Make sure to import the Pagination component

const Students = ({ userProfile }) => {
  const { students, setStudents } = useFetchStudents();

  const handleDeleteUser = (userId) => {
    const updatedStudents = students.filter((user) => user.id !== userId);
    setStudents(updatedStudents);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const tableHeaders = [
    "ID",
    "Name",
    "Email",
    "User Role",
    "Last Logged",
    "Actions",
  ];

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleTableData = filteredStudents
    .filter((item) => item.role === "Učenik")
    .slice(startIndex, endIndex)
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
      <div className={classes.titleContent}>
        <h2 className={classes.title}>Učenici</h2>
        <div className={classes.under_header}>
          <Button
            onClick={() => (window.location.href = "/useraddform?role=Učenik")}
          >
            Novi Učenik
          </Button>
          <div className={classes.search}>
            <BsSearch className={classes.search_icon} />
            <SearchBox
              onSearch={setSearchTerm}
              className={classes.search_box}
            />
          </div>
        </div>
      </div>
      <Table headers={tableHeaders} data={visibleTableData} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredStudents.length / ITEMS_PER_PAGE)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Students;
