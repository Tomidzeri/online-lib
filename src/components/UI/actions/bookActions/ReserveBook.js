import React, { useState } from "react";
import Button from "../../buttons/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { reserveBook } from "../../../../queries/knjige/useReserveBook"; 
import useFetchStudents from "../../../../queries/korisnici/useFetchStudents";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useBookDetails from "../../../../queries/knjige/useBookDetails";

const ReserveBook = () => {
  const [reserveDate, setReserveDate] = useState(new Date()); 
  const { bookId } = useParams();
  const navigate = useNavigate();
  const book = useBookDetails(bookId);

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

  const filteredStudents = students.filter(
    (student) => student.role === "Učenik" && (student.name || student.surname)
  );

  const handleReserve = async (e) => {
    e.preventDefault();
    try {
      const reservedBookData = {
        student_id: selectedUserId,
        datumRezervisanja: formatDate(reserveDate), 
      };
  
      await reserveBook(bookId, reservedBookData);
  
      toast.success("Knjiga je uspješno rezervisana.", {
        position: "top-center",
        autoClose: 3000,
      });
  
      console.log("Book reserved successfully:", reservedBookData);
    } catch (error) {
      console.error("Error reserving book:", error);
  
      if (error.response && error.response.status === 422) {
        toast.error(
          "Nije moguće rezervisati knjigu, učenik već ima rezervaciju za ovu knjigu.",
          {
            position: "top-center",
            autoClose: 3000,
          }
        );
      } else {
        toast.error("Nepoznata greška prilikom rezervacije knjige.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };
  

  const handleBackClick = () => {
    navigate("/books");
  };

  return (
    <div className="mt-14 ml-15">
      <div className="w-full">
        <div className="flex flex-col border-b border-gray-300 w-full pb-2 mb-2">
          <h2 className="text-2xl font-bold text-left ml-20">Rezerviši Knjigu</h2>
          <div className="flex flex-row">
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700 ml-20"
              onClick={handleBackClick}
            >
              Evidencija Knjiga /
            </button>
            <p>&nbsp;{book?.title}</p>
          </div>
        </div>
        <div className="flex justify-baseline">
          <form className="w-1/2 ml-20">
            <div className="mb-4">
              <label
                htmlFor="userId"
                className="block text-gray-600 font-semibold mb-2"
              >
                Izaberi ucenika koji rezerviše knjigu
              </label>
              <select
                id="userId"
                name="userId"
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">Select User</option>
                {filteredStudents.map((student) => (
                  <option key={student.id} value={student.id}>
                    {`${student.name} ${student.surname}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="reserveDate"
                className="block text-gray-600 font-semibold mb-2"
              >
                Datum rezervacije
              </label>
              <DatePicker
                id="reserveDate"
                selected={reserveDate}
                onChange={(date) => setReserveDate(date)}
                className="border border-gray-300 px-3 py-2 rounded-md w-full"
              />
            </div>
            <Button
              onClick={handleReserve}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Rezerviši Knjigu
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReserveBook;
