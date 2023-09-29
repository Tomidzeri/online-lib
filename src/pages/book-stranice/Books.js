import React, { useEffect, useState } from "react";
import ReusableTable from "../../components/UI/tables/Table";
import { fetchBooks } from "../../queries/knjige/fetchBooks";
import Button from "../../components/UI/buttons/PlusButton";
import SearchBox from "../../components/UI/search/SearchBox";
import { BsSearch } from "react-icons/bs";
import Pagination from "../../components/UI/pagination/Pagination";
import BookActionsDropdown from "../../components/UI/actions/BookActionsDropdown";
import useDeleteBook from "../../queries/knjige/useDeleteBook";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const deleteBook = useDeleteBook();

  useEffect(() => {
    setLoading(true);

    fetchBooks()
      .then((data) => {
        setTimeout(() => {
          setBooks(data);
          setLoading(false);
          console.log(data);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  const ITEMS_PER_PAGE = 8;

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredBooks.length;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const tableData = filteredBooks.slice(startIndex, endIndex).map((book) => [
    book.title,
    book.authors.map((author) => `${author.name} ${author.surname}`).join(", "), // izbrisati nakon brisanja prve dvije knjige, jer koriste dva autora
    book.categories.map((category) => category.name).join(", "),
    book.samples,
    book.rSamples,
    book.samples - book.bSamples,
    book.bSamples,
    <BookActionsDropdown
      book={book}
      onDelete={() => handleDeleteBook(book.id)}
    />,
  ]);

  const customTableHead = [
    "Naziv Knjige",
    "Autor",
    "Kategorija",
    "Ukupna Kolicina",
    "Rezervisano",
    "Na Raspolaganju",
    "Izdato",
    "Actions",
  ];

  const handleDeleteBook = (bookId) => {
    deleteBook(bookId);
    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
  };

  return (
    <div className="mt-16 ml-15">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full pb-4 mb-4">
          <h2 className="text-4xl font-bold text-left ml-20">Knjige</h2>
        </div>
        <div className="flex justify-between">
          <div className="flex justify-between w-full mb-2 ml-20">
            <Button
              onClick={() => navigate("/storebook")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-md"
            >
              Nova Knjiga
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
          <div className="ml-20">
            <ReusableTable tableHead={customTableHead} tableData={tableData} />
          </div>
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

export default Books;
