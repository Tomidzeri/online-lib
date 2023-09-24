import React, { useState, useEffect } from "react";
import ReusableTable from "../components/UI/tables/Table";
import fetchAuthors from "../queries/autori/fetchAuthors";
import Pagination from "../components/UI/pagination/Pagination";
import SearchBox from "../components/UI/search/SearchBox";
import { BsSearch } from "react-icons/bs";
import Button from "../components/UI/buttons/Button";
import AuthorActionsDropdown from "../components/UI/actions/AuthorActionsDropdown";
import useDeleteAuthor from "../queries/autori/useDeleteAuthor";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 5;
  const deleteAuthor = useDeleteAuthor();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchAuthors()
      .then((data) => {
        setTimeout(() => {
          console.log(data);
          setAuthors(data.data);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const tableHeaders = ["Naziv Autora", "Opis", "Actions"];

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
    <div className="main-content  mt-24 ml-20">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full pb-2 mb-2">
          <h2 className="text-2xl font-bold text-center">Autori</h2>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-between w-full mb-2">
            <Button
              onClick={() => (window.location.href = "/createauthor")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-md"
            >
              Novi Autor
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BsSearch className="text-gray-600 text-lg" />
              <SearchBox
                onSearch={handleSearch}
                className="border border-gray-300 mb-2 px-2 py-2 rounded-md"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <AiOutlineLoading3Quarters className="text-red-500 text-4xl animate-spin" />
          </div>
        ) : (
          <ReusableTable
            tableHead={tableHeaders}
            tableData={visibleTableData}
          />
        )}

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
