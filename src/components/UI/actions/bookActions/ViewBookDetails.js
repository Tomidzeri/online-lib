import React, { useState, useEffect } from "react";
import Tab from "../../tabs/Tab";
import useBookDetails from "../../../../queries/knjige/useBookDetails";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { fetchBorrowedBooks } from "../../../../queries/knjige/useBookBorrow";
import { format } from "date-fns";
import { FaBook, FaReply, FaTrash, FaBookmark } from "react-icons/fa";
import BookDetailsAction from "../BookDetailsActionDropdown";

const ViewBookDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { bookId } = useParams();
  const book = useBookDetails(bookId);
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const borrowedBooksData = await fetchBorrowedBooks();

        const matchingActivities = [];

        borrowedBooksData.izdate.forEach((item) => {
          if (item.knjiga.id === parseInt(bookId)) {
            matchingActivities.push({
              activityType: "izdate",
              activity: item,
            });
          }
        });

        borrowedBooksData.otpisane.forEach((item) => {
          if (item.knjiga.id === parseInt(bookId)) {
            matchingActivities.push({
              activityType: "otpisane",
              activity: item,
            });
          }
        });

        borrowedBooksData.prekoracene.forEach((item) => {
          if (item.knjiga.id === parseInt(bookId)) {
            matchingActivities.push({
              activityType: "prekoracene",
              activity: item,
            });
          }
        });

        borrowedBooksData.vracene.forEach((item) => {
          if (item.knjiga.id === parseInt(bookId)) {
            matchingActivities.push({
              activityType: "vracene",
              activity: item,
            });
          }
        });

        setActivities(matchingActivities);
      } catch (error) {
        console.error("Error fetching borrowed books data:", error);
      }
    };

    fetchData();
  }, [bookId]);

  if (!book) {
    return <div className="loading">Loading...</div>;
  }

  const renderSentence = (activity) => {
    let sentence = "";

    if (activity.activityType === "izdate") {
      const formattedBorrowDate = format(
        new Date(activity.activity.borrow_date),
        "dd-MM-yyyy"
      );

      sentence = `${activity.activity.bibliotekar0?.name} ${activity.activity.bibliotekar0?.surname} je izdao/la knjigu ${activity.activity.knjiga.title} uceniku ${activity.activity.student.name} ${activity.activity.student.surname} datuma ${formattedBorrowDate}`;
    } else if (activity.activityType === "otpisane") {
      const formattedBorrowDate = format(
        new Date(activity.activity.borrow_date),
        "dd-MM-yyyy"
      );

      sentence = `${activity.activity.bibliotekar0?.name} ${activity.activity.bibliotekar0?.surname} je otpisao/la knjigu ${activity.activity.knjiga.title} koja je bila izdata uceniku ${activity.activity.student.name} ${activity.activity.student.surname} datuma ${formattedBorrowDate}`;
    } else if (activity.activityType === "vracene") {
      const formattedReturnDate = format(
        new Date(activity.activity.return_date),
        "dd-MM-yyyy"
      );

      sentence = `Ucenik ${activity.activity.student.name} ${activity.activity.student.surname} je vratio/la knjigu ${activity.activity.knjiga.title} izdatu od strane ${activity.activity.bibliotekar0?.name} ${activity.activity.bibliotekar0.surname} datuma ${formattedReturnDate}`;
    } else if (activity.activityType === "prekoracene") {
      // "prekoracene"
    }

    return sentence;
  };

  const handleBorrowClick = () => {
    navigate(`/borrowbook/${bookId}`);
  };

  const handleReturnClick = () => {
    navigate(`/returnbook/${bookId}`);
  };

  const handleWriteOffClick = () => {
    navigate(`/writeoffbook/${bookId}`);
  };

  const handleReserveClick = () => {
    navigate(`/reservebook/${bookId}`);
  };

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
              <h3 className="text-lg pb-6">Naziv: {book.title}</h3>
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
        <div className="ml-24 mr-4 border p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-lg pb-6">Language: {book.language.name}</h3>
          <h3 className="text-lg pb-6">Broj strana: {book.pages}</h3>
          <h3 className="text-lg pb-6">ISBN: {book.isbn}</h3>
          <h3 className="text-lg pb-6">Pismo: {book.script.name}</h3>
          <h3 className="text-lg pb-6">Povez: {book.bookbind.name}</h3>
          <h3 className="text-lg mt-2">Format: {book.format.name}</h3>
        </div>
      ),
    },
    {
      label: "Slike",
      content: (
        <div className="p-4 flex justify-baseline items-center">
          <div className="ml-24 mr-4 border p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg">Slike:</h3>
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
        <div className="border-b border-gray-300 w-full flex flex-row justify-between">
          <div className="flex items-center content-center">
            <Avatar
              alt="Book Cover"
              src="https://tim2.petardev.live/img/book-cover-placeholder.png"
              sx={{
                width: 50,
                height: 50,
                marginRight: 0,
                marginLeft: 12,
                marginBottom: 1,
              }}
            />
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-left ml-6">
                {book?.title}
              </h2>
              <button
                onClick={handleBackClick}
                className="text-blue-500 hover:text-blue-700 mb-2 underline-none focus:outline-none"
              >
                Evidencija knjiga
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <button
                onClick={handleBorrowClick}
                className="flex items-center text-gray-700 hover:text-blue-700 mb-2 mr-4 underline-none focus:outline-none"
              >
                <FaBook className="mr-1" /> Izdaj knjigu
              </button>

              <button
                onClick={handleReturnClick}
                className="flex items-center text-gray-700 hover:text-blue-700 mb-2 mr-4 underline-none focus:outline-none"
              >
                <FaReply className="mr-1" /> Vrati knjigu
              </button>

              <button
                onClick={handleWriteOffClick}
                className="flex items-center text-gray-700 hover:text-blue-700 mb-2 mr-4 underline-none focus:outline-none"
              >
                <FaTrash className="mr-1" /> Otpisi knjigu
              </button>

              <button
                onClick={handleReserveClick}
                className="flex items-center text-gray-700 hover:text-blue-700 mb-2 mr-4 underline-none focus:outline-none"
              >
                <FaBookmark className="mr-1" /> Rezervisi knjigu
              </button>
            </div>
            <span className="mx-2 border-l border-gray-500 h-12" />
            <div className="flex flex-row justify-center items-center">
              <BookDetailsAction />
            </div>
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
          <div className="w-1/6 border-l border-gray-300 h-full flex flex-col justify-baseline">
            <h2 className="text-2xl mt-4 text-center">Statistika</h2>
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
            <div className="text-center">
              <div className="mb-4">
                {activities.slice(0, 3).map((activity, index) => (
                  <div key={index} className="p-2 mb-2">
                    {renderSentence(activity)}
                  </div>
                ))}
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
                onClick={() => navigate("/activities")}
              >
                Sve aktivnosti
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;
