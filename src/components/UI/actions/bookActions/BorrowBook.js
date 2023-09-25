import React, { useState } from "react";
import Button from "../../buttons/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { borrowBook } from "../../../../queries/knjige/useSingleBookBorrow";
import useFetchStudents from "../../../../queries/korisnici/useFetchStudents";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BorrowBook = () => {
  const [borrowDate, setBorrowDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { students } = useFetchStudents();

  const [selectedUserId, setSelectedUserId] = useState("");

  console.log(selectedUserId);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${month}/${day}/${year}`;
  }

  const handleBorrow =  () => {
    try {
      const borrowedBookData = {
        student_id: selectedUserId,
        datumIzdavanja: formatDate(borrowDate),
        datumVracanja: formatDate(returnDate),
      };

      borrowBook(bookId, borrowedBookData);
      navigate("/books");
      console.log("Book borrowed succesfully:", borrowedBookData);
    } catch (error) {
      console.error("Error borrowing book:", error);
    }
  };

  const filteredStudents = students.filter(
    (student) => student.role === "Učenik"
  );

  return (
    <div className="main-content mt-24 ml-20">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full pb-2 mb-2">
          <h2 className="text-2xl font-bold text-center">Izdaj Knjigu</h2>
        </div>
        <div className="flex justify-center">
          <form className="w-1/2">
            <div className="mb-4">
              <label
                htmlFor="userId"
                className="block text-gray-600 font-semibold mb-2"
              >
                Izaberi ucenika koji zaduzuje knjigu
              </label>
              <select
                id="userId"
                name="userId"
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                {filteredStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {`${student.name} ${student.surname}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="borrowDate"
                className="block text-gray-600 font-semibold mb-2"
              >
                Datum izdavanja
              </label>
              <DatePicker
                id="borrowDate"
                selected={borrowDate}
                onChange={(date) => setBorrowDate(date)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="returnDate"
                className="block text-gray-600 font-semibold mb-2"
              >
                Datum izdavanja (Minimum 20 dana)
              </label>
              <DatePicker
                id="returnDate"
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>
            <Button
              onClick={handleBorrow}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Izdaj Knjigu
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BorrowBook;
