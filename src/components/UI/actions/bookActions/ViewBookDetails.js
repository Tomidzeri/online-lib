import React, { useState } from "react";
import Tab from "../../tabs/Tab";
import useBookDetails from "../../../../queries/knjige/useBookDetails";
import { useParams } from "react-router-dom";
import Button from "../../buttons/Button";
import { useNavigate } from "react-router-dom";

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
        <div className="p-4 mt-6 py-6 flex">
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
        <div className="p-4">
          <h3 className="text-xl font-semibold">
            Language: {book.language.name}
          </h3>
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
    <div className="main-content mt-14 ml-20">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full pb-2 text-center">
          <h2 className="text-3xl font-semibold mb-4">Detalji knjige</h2>
        </div>
        <Tab
          labels={tabsContent.map((tab) => tab.label)}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className="mb-4"
        >
          {tabsContent.map((tab, index) => (
            <div key={index} className={activeTab === index ? "" : "hidden"}>
              {tab.content}
            </div>
          ))}
        </Tab>
        <Button onClick={handleBackClick}>Nazad</Button>
      </div>
    </div>
  );
};

export default ViewBookDetails;
