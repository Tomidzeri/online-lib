import React, { useState, useEffect } from "react";
import UserActionsDropdown from "../../components/UI/actions/UserActionsDropdown";
import ReusableTable from "../../components/UI/tables/Table";
import useFetchLibrarians from "../../queries/korisnici/useFetchLibrarians";
import Button from "../../components/UI/buttons/PlusButton";
import SearchBox from "../../components/UI/search/SearchBox";
import { BsSearch } from "react-icons/bs";
import Pagination from "../../components/UI/pagination/Pagination";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Librarians = ({ userProfile }) => {
  const { librarians, setLibrarians } = useFetchLibrarians();
  const [searchTerm, setSearchTerm] = useState("");
  const tableHeaders = [
    "ID",
    "Ime i Prezime",
    "Email",
    "Uloga",
    "Vrijeme zadnjeg logovanja",
    "Opcije",
  ];

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleDeleteUser = (userId) => {
    const updatedLibrarians = librarians.filter((user) => user.id !== userId);
    setLibrarians(updatedLibrarians);
  };

  const filteredLibrarians = librarians.filter(
    (librarian) =>
      `${librarian.name} ${librarian.surname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      librarian.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = librarians.filter(
    (librarian) => librarian.role === "Bibliotekar"
  ).length;

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const visibleTableData = filteredLibrarians
    .filter((item) => item.role === "Bibliotekar")
    .slice(startIndex, endIndex)
    .map((librarian) => [
      librarian.id,
      <div className="flex items-center">
      <img
        src={librarian.photoPath} 
        alt="slika"
        className="w-8 h-8 rounded-full mr-2" 
      />
      {`${librarian.name} ${librarian.surname}`}
    </div>,
      librarian.email,
      librarian.role,
      librarian.lastLoggedTime,
      <UserActionsDropdown
        user={librarian}
        onDelete={() => handleDeleteUser(librarian.id)}
      />,
    ]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="mt-16 ml-15">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full pb-4 mb-4">
          <h2 className="text-4xl font-bold text-left ml-20">Bibliotekari</h2>
        </div>
        <div className="flex justify-between">
        <div className="flex justify-between w-full mb-2 ml-20">
            <Button
              onClick={() =>
                (window.location.href = "/useraddform?role=Bibliotekar")
              }
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-md"
            >
              Novi Bibliotekar
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

        {loading ? (
          <div className="flex items-center justify-center h-32">
            <AiOutlineLoading3Quarters className="text-red-500 text-4xl animate-spin" />
          </div>
        ) : (
          <>
            <div className="ml-20">
            <ReusableTable
              tableHead={tableHeaders}
              tableData={visibleTableData}
            />
          </div>
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              onPageChange={handlePageChange}
              itemsPerPage={ITEMS_PER_PAGE}
              className="mt-4"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Librarians;
