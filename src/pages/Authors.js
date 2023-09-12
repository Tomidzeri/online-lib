import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReusableTable from "../components/UI/tables/Table";
import fetchAuthors from "../queries/fetchAuthors";
import Pagination from "../components/UI/pagination/Pagination";
import SearchBox from "../components/UI/search/SearchBox";
import { BsSearch } from "react-icons/bs";
import Button from "../components/UI/buttons/Button";
import AuthorActionsDropdown from "../components/UI/AuthorActionsDropdown";
import useDeleteAuthor from "../queries/useDeleteAuthor";

const Authors = () => {
  const [authors, setAuthors] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 6; 
  const deleteAuthor = useDeleteAuthor();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAuthors()
      .then((data) => {
        console.log(data);
        setAuthors(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const tableHeaders = ["Naziv Autora", "Opis"];

      const filteredAuthors = authors.filter((author) =>
      `${author.name} ${author.surname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    const handleDeleteAuthor = (authorId) => {
      deleteAuthor(authorId);
      const updatedAuthors = authors.filter((author) => author.id !== authorId);
      setAuthors(updatedAuthors);
    };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); 
  };

  const totalItems = filteredAuthors.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const visibleTableData = filteredAuthors
  .slice(startIndex, endIndex)
  .map((author) => [
    `${author.name} ${author.surname}`,
    " Lorem ipsum odor amet, consectetuer adipiscing elit.",
    <AuthorActionsDropdown
      author={author}
      onDelete={() => handleDeleteAuthor(author.id)}
    />,
  ]);


  return (
    <div className="main-content z-10 mt-24 ml-20">
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Autori</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BsSearch className="text-gray-600 text-lg" />
              <SearchBox
                onSearch={handleSearch}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>
        </div>
        <div className="mb-4"> 
          <Link to="/createauthor">
            <Button>Create Author</Button>
          </Link>
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

export default Authors;
