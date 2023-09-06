import React, { useState } from "react";
import classes from "./users.module.css";
import UserActionsDropdown from "../../components/UI/UserActionsDropdown";
import Table from "../../components/UI/tables/Table";
import useFetchLibrarians from "../../queries/useFetchLibrarians";
import Button from "../../components/UI/buttons/Button";
import SearchBox from "../../components/UI/search/SearchBox";
import { BsSearch } from "react-icons/bs";
import Pagination from "../../components/UI/pagination/Pagination";

const Librarians = ({ userProfile }) => {
  const { librarians, setLibrarians } = useFetchLibrarians();

  const handleDeleteUser = (userId) => {
    const updatedLibrarians = librarians.filter((user) => user.id !== userId);
    setLibrarians(updatedLibrarians);
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

  const filteredLibrarians = librarians.filter((librarian) =>
    `${librarian.name} ${librarian.surname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const ITEMS_PER_PAGE = 5;

  const totalItems = filteredLibrarians.length;

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  const visibleTableData = filteredLibrarians
    .filter((item) => item.role === "Bibliotekar")
    .slice(startIndex, endIndex)
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
      <div className={classes.header}>
        <div className={classes.titleContent}>
          <h2 className={classes.title}>Bibliotekari</h2>
          <div className={classes.under_header}>
            <Button
              onClick={() =>
                (window.location.href = "/useraddform?role=Bibliotekar")
              }
            >
              Novi Bibliotekar
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
      </div>
      <Table headers={tableHeaders} data={visibleTableData} />
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
};

export default Librarians;
