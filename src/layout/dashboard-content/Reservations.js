import React, { useEffect, useState } from "react";
import { AllReservations } from "../../queries/knjige/useAllReservations";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Reservations = () => {
  const [reservedBooks, setReservedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    AllReservations()
      .then((data) => {
        setTimeout(() => {
          setReservedBooks(data.active);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error fetching reserved books:", error);
        setLoading(false);
      });
  }, []);

  // Slice the first 4 items from the reservedBooks array
  const displayedBooks = reservedBooks.slice(0, 4);

  return (
    <div className="w-full mt-20">
      <h2 className="text-3xl font-bold mb-4">Rezervacije</h2>
      {loading ? (
        <div className="flex items-center justify-center h-72">
          <AiOutlineLoading3Quarters className="text-red-500 text-4xl animate-spin" />
        </div>
      ) : (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-4">Ucenik</th>
              <th className="border px-4 py-4">Datum rezervacije</th>
              <th className="border px-4 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {displayedBooks.map((book) => (
              <tr key={book.id}>
                <td className="border px-4 py-2">{`${book.student.name} ${book.student.surname}`}</td>
                <td className="border px-4 py-2">
                  {format(new Date(book.action_date), "yyyy-MM-dd")}
                </td>
                <td className="border px-4 py-2">{book.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link
        to="/borrows?activeTab=3"
        style={{
          display: "block",
          marginTop: "10px",
          fontSize: "18px",
          textDecoration: "none",
          color: "blue",
          fontWeight: "bold",
          border: "1px solid blue", 
          padding: "8px", 
        }}
      >
        Prikazi sve
      </Link>
    </div>
  );
};

export default Reservations;
