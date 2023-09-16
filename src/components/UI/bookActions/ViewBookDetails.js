import React, { useState } from "react";
import Tab from "../tabs/Tab";
import useBookDetails from "../../../queries/useBookDetails";
import { useParams } from "react-router-dom";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";

const ViewBookDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { bookId } = useParams();
  const book = useBookDetails(bookId);
  const navigate = useNavigate();

  if (!book) {
    return <div className="loading">Loading...</div>;
  }

  const handleBackClick = () => {
    navigate(`/books`);
  };

  const tabsContent = [
    {
      label: "Basic Info",
      content: (
        <div className="p-4 flex">
          <div className="w-1/2 pr-4">
            <h3 className="text-xl font-semibold">Title: {book.nazivKnjiga}</h3>
            <h3 className="text-lg mt-2">
              Authors:{" "}
              {book.authors && book.authors.length > 0
                ? book.authors
                    .map((author) => `${author.name} ${author.surname}`)
                    .join(", ")
                : "N/A"}
            </h3>
            <h3 className="text-lg mt-2">
              Categories:{" "}
              {book.categories && book.categories.length > 0
                ? book.categories.map((category) => category.name).join(", ")
                : "N/A"}
            </h3>
            <h3 className="text-lg mt-2">Publisher: {book.publisher.name}</h3>
            <h3 className="text-lg mt-2">Kolicina: {book.samples}</h3>
            <h3 className="text-lg mt-2">Publish Year: {book.pDate}</h3>
            <h3 className="text-lg mt-2">
              Genres:{" "}
              {book.genres && book.genres.length > 0
                ? book.genres.map((genre) => genre.name).join(", ")
                : "N/A"}
            </h3>
          </div>
          <div className="w-1/2">
            <h3 className="text-xl font-semibold">Description:</h3>
            <p className="mt-2">{book.description}</p>
          </div>
        </div>
      ),
    },
    {
      label: "Specifications",
      content: (
        <div className="p-4">
          <h3 className="text-xl font-semibold">Language: {book.language.name}</h3>
          <h3 className="text-lg mt-2">Number of Pages: {book.pages}</h3>
          <h3 className="text-lg mt-2">ISBN: {book.isbn}</h3>
          <h3 className="text-lg mt-2">Pismo: {book.script.name}</h3>
          <h3 className="text-lg mt-2">Povez: {book.bookbind.name}</h3>
          <h3 className="text-lg mt-2">Format: {book.format.name}</h3>
        </div>
      ),
    },
    {
      label: "Multimedia",
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
    <div className="container mx-auto p-4 mt-24 ml-20">
      <h2 className="text-3xl font-semibold mb-4">View Book Details</h2>
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
      <Button onClick={handleBackClick}>
        Go back
      </Button>
    </div>
  );
};

export default ViewBookDetails;
