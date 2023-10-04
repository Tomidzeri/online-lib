import React, { useEffect, useState } from "react";
import { AllReservations } from "../../queries/knjige/useAllReservations";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { format } from "date-fns";

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

  return (
    <div className="w-full mt-20">
      <h2 className="text-2xl font-bold mb-4">Rezervacije</h2>
      {loading ? (
        <div className="flex items-center justify-center h-72">
          <AiOutlineLoading3Quarters className="text-red-500 text-4xl animate-spin" />
        </div>
      ) : (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Ucenik</th>
              <th className="border px-4 py-2">Datum rezervacije</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {reservedBooks.map((book) => (
              <tr key={book.id}>
                <td className="border px-4 py-2">{`${book.student.name} ${book.student.surname}`}</td>
                <td className="border px-4 py-2">{format(new Date(book.action_date), "yyyy-MM-dd")}</td>
                <td className="border px-4 py-2">{book.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reservations;
