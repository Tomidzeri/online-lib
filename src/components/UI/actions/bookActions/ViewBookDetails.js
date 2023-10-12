import React, { useState, useEffect } from "react";
import Tab from "../../tabs/Tab";
import useBookDetails from "../../../../queries/knjige/useBookDetails";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { fetchBorrowedBooks } from "../../../../queries/knjige/useBookBorrow";

const ViewBookDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { bookId } = useParams();
  const book = useBookDetails(bookId);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch borrowed books data
    const fetchData = async () => {
      try {
        const borrowedBooksData = await fetchBorrowedBooks();

        // Iterate through each array and log matching activities
        console.log("Matching Activities:");
        console.log("Izdate:");
        borrowedBooksData.izdate.forEach((item) => {
          if (item.knjiga.id === parseInt(bookId)) {
            console.log(item);
          }
        });

        console.log("Otpisane:");
        borrowedBooksData.otpisane.forEach((item) => {
          if (item.knjiga.id === parseInt(bookId)) {
            console.log(item);
          }
        });

        console.log("Prekoracene:");
        borrowedBooksData.prekoracene.forEach((item) => {
          if (item.knjiga.id === parseInt(bookId)) {
            console.log(item);
          }
        });

        console.log("Vracene:");
        borrowedBooksData.vracene.forEach((item) => {
          if (item.knjiga.id === parseInt(bookId)) {
            console.log(item);
          }
        });
      } catch (error) {
        console.error("Error fetching borrowed books data:", error);
      }
    };

    fetchData();
  }, [bookId]);

  if (!book) {
    return <div className="loading">Loading...</div>;
  }

  const handleBackClick = () => {
    navigate(`/books`);
  };

  const tabsContent = [
    {
      label: "Osnovni detalji",
      content: (
        <div className="p-4 ml-20 mt-6 text-left py-6 flex">
          <div className="w-1/2 pr-4">
            <div className="border p-4 rounded-lg shadow-md mb-4">
              <h3 className="text-lg pb-6">
                Naziv: {book.title}
              </h3>
              <h3 className="text-lg pb-6">
                Autor:{" "}
                {book.authors && book.authors.length > 0
                  ? book.authors
                      .map((author) => `${author.name} ${author.surname}`)
                      .join(", ")
                  : "N/A"}
              </h3>
              <h3 className="text-lg pb-6">
                Kategorija:{" "}
                {book.categories && book.categories.length > 0
                  ? book.categories.map((category) => category.name).join(", ")
                  : "N/A"}
              </h3>
              <h3 className="text-lg pb-6">Izdavac: {book.publisher.name}</h3>
              <h3 className="text-lg pb-6">Kolicina: {book.samples}</h3>
              <h3 className="text-lg pb-6">Godina izdavanja: {book.pDate}</h3>
              <h3 className="text-lg mt-2">
                Zanr:{" "}
                {book.genres && book.genres.length > 0
                  ? book.genres.map((genre) => genre.name).join(", ")
                  : "N/A"}
              </h3>
            </div>
          </div>
          <div className="w-1/2">
            <div className="border p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold pb-2">Description:</h3>
              <div
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: book.description }}
              />
            </div>
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
    <div className="mt-16 flex flex-row">
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
          <div className="w-1/6 border-l border-gray-300 flex flex-col justify-center">
            <h2 className="text-3xl text-center font-bold">Statistika</h2>
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
            <div>{/* book borrows  */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;
