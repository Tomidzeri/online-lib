import React, { useState, useEffect } from "react";
import ReusableTable from "../components/UI/tables/Table";
import fetchAuthors from "../queries/fetchAuthors";
import Pagination from "../components/UI/pagination/Pagination";
import SearchBox from "../components/UI/search/SearchBox";
import { BsSearch } from "react-icons/bs";
import Button from "../components/UI/buttons/Button";

const Authors = () => {
  const [authors, setAuthors] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const ITEMS_PER_PAGE = 10; // Set items per page to 10

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

  const tableData =
    Array.isArray(authors) && authors.length > 0
      ? authors.map((author) => [
          `${author.name} ${author.surname}`,
          " Lorem ipsum odor amet, consectetuer adipiscing elit.",
        ])
      : [];

      const filteredAuthors = authors.filter((author) =>
      `${author.name} ${author.surname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const totalItems = filteredAuthors.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const visibleTableData = filteredAuthors
  .slice(startIndex, endIndex)
  .map((author) => [
    `${author.name} ${author.surname}`,
    " Lorem ipsum odor amet, consectetuer adipiscing elit.",
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
