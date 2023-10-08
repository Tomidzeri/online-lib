import React, { useState } from "react";
import Tab from "../../tabs/Tab";
import useBookDetails from "../../../../queries/knjige/useBookDetails";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
// import { fetchBorrowedBooks } from "../../../../queries/knjige/useBookBorrow";

const ViewBookDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { bookId } = useParams();
  const book = useBookDetails(bookId);
  const navigate = useNavigate();

  if (!book) {
    return <div className="loading">Loading...</div>;
  }

  console.log(book);

  const handleBackClick = () => {
    navigate(`/books`);
  };

  const tabsContent = [
    {
      label: "Osnovni detalji",
      content: (
        <div className="p-4 mt-6 text-center py-6 flex">
          <div className="w-1/2 pr-4">
            <h3 className="text-xl font-semibold pb-4">Naziv: {book.title}</h3>
            <h3 className="text-lg mt-6">
              Autor:{" "}
              {book.authors && book.authors.length > 0
                ? book.authors
                    .map((author) => `${author.name} ${author.surname}`)
                    .join(", ")
                : "N/A"}
            </h3>
            <h3 className="text-lg mt-2">
              Kategorija:{" "}
              {book.categories && book.categories.length > 0
                ? book.categories.map((category) => category.name).join(", ")
                : "N/A"}
            </h3>
            <h3 className="text-lg mt-2">Izdavac: {book.publisher.name}</h3>
            <h3 className="text-lg mt-2">Kolicina: {book.samples}</h3>
            <h3 className="text-lg mt-2">Godina izdavanja: {book.pDate}</h3>
            <h3 className="text-lg mt-2">
              Zanr:{" "}
              {book.genres && book.genres.length > 0
                ? book.genres.map((genre) => genre.name).join(", ")
                : "N/A"}
            </h3>
          </div>
          <div className="w-1/2">
            <h3 className="text-xl font-semibold">Description:</h3>
            <div
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: book.description }}
            />
          </div>
        </div>
      ),
    },
    {
      label: "Specifikacije",
      content: (
        <div className="p-4  text-center ">
          <h3 className="text-lg">Language: {book.language.name}</h3>
          <h3 className="text-lg mt-2">Broj strana: {book.pages}</h3>
          <h3 className="text-lg mt-2">ISBN: {book.isbn}</h3>
          <h3 className="text-lg mt-2">Pismo: {book.script.name}</h3>
          <h3 className="text-lg mt-2">Povez: {book.bookbind.name}</h3>
          <h3 className="text-lg mt-2">Format: {book.format.name}</h3>
        </div>
      ),
    },
    {
      label: "Slike",
      content: (
        <div className="p-4 flex justify-center items-center">
          <div>
            <h3 className="text-xl font-semibold">Images:</h3>
            <img
              src="https://tim2.petardev.live/img/book-cover-placeholder.png"
              alt="Book Cover"
              className="mt-2"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-14 ml-15 flex flex-row">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full text-left flex flex-row items-center content-center">
          <Avatar
            alt="Book Cover"
            src="https://tim2.petardev.live/img/book-cover-placeholder.png"
            sx={{
              width: 50,
              height: 50,
              marginRight: 0,
              marginLeft: 10,
              marginBottom: 1,
            }}
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-left ml-6">{book?.title}</h2>
            <button
              onClick={handleBackClick}
              className="text-blue-500 hover:text-blue-700 mb-2 underline-none focus:outline-none"
            >
              Evidencija knjiga
            </button>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-5/6">
            <Tab
              labels={tabsContent.map((tab) => tab.label)}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              className="mb-4"
            >
              {tabsContent.map((tab, index) => (
                <div
                  key={index}
                  className={activeTab === index ? "" : "hidden"}
                >
                  {tab.content}
                </div>
              ))}
            </Tab>
          </div>
          <div className="w-1/6 border-l border-gray-300 flex flex-col">
            <div className="mt-6 mb-6 pl-6 pr-6 pb-6 text-center border-b border-gray-300">
              <h3 className="text-lg bg-blue-500 text-white rounded-md p-2 mb-2">
                Ukupna kolicina: {book.samples}
              </h3>
              <h3 className="text-lg bg-green-500 text-white rounded-md p-2 mb-2">
                Rezervisano: {book.rSamples}
              </h3>
              <h3 className="text-lg bg-yellow-500 text-white rounded-md p-2 mb-2">
                Izdato: {book.bSamples}
              </h3>
              <h3 className="text-lg bg-red-500 text-white rounded-md p-2 mb-2">
                U prekoracenju: {book.fSamples}
              </h3>
              <h3 className="text-lg bg-indigo-500 text-white rounded-md p-2">
                Na raspolaganju:{" "}
                {book.samples - book.rSamples - book.bSamples - book.fSamples}
              </h3>
            </div>
            <div>
               {/* book borrows  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;
