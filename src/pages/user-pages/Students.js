import React, { useState } from "react";
import UserActionsDropdown from "../../components/UI/UserActionsDropdown";
import ReusableTable from "../../components/UI/tables/Table";
import useFetchStudents from "../../queries/useFetchStudents";
import Button from "../../components/UI/buttons/Button";
import SearchBox from "../../components/UI/search/SearchBox";
import { BsSearch } from "react-icons/bs";
import Pagination from "../../components/UI/pagination/Pagination";

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
    `${student.name} ${student.surname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const ITEMS_PER_PAGE = 4;

  const totalItems = filteredStudents.length;

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const visibleTableData = filteredStudents
    .filter((item) => item.role === "Učenik")
    .slice(startIndex, endIndex)
    .map((student) => [
      student.id,
      `${student.name} ${student.surname}`,
      student.email,
      student.role,
      student.lastLoggedTime,
      <UserActionsDropdown
        user={student}
        onDelete={() => handleDeleteUser(student.id)}
      />,
    ]);

  return (
    <div className="main-content z-10 mt-24 ml-20">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full pb-2 mb-2">
          <h2 className="text-2xl font-bold text-center">Ucenici</h2>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-between w-full mb-2">
            <Button
              onClick={() =>
                (window.location.href = "/useraddform?role=Učenik")
              }
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-md"
            >
              Novi Ucenici
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BsSearch className="text-gray-600 text-lg" />
              <SearchBox
                onSearch={setSearchTerm}
                className="border border-gray-300 mb-2 px-2 py-2 rounded-md"
              />
            </div>
          </div>
        </div>

        <ReusableTable tableHead={tableHeaders} tableData={visibleTableData} />
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          onPageChange={setCurrentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default Students;
