import React, { useEffect, useState } from "react";
import { fetchBorrowedBooks } from "../../queries/knjige/useBookBorrow";
import { AllReservations } from "../../queries/knjige/useAllReservations";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(loading);

  useEffect(() => {
    setLoading(true);

    fetchBorrowedBooks()
      .then((data) => {
        const issuedBooks = data.izdate.length;
        const overdueBooks = data.prekoracene.length;

        AllReservations()
          .then((reservationData) => {
            const reservedBooks = reservationData.active.length;

            setStatisticsData([
              { category: "Izdate knjige", count: issuedBooks, color: "#8884d8" },
              { category: "Rezervisane knjige", count: reservedBooks, color: "#82ca9d" },
              { category: "Prekoracene knjige", count: overdueBooks, color: "#ffc658" },
            ]);

            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching reserved books:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching borrowed books:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-40 flex flex-col items-center justify-center">
     <h2 className="text-3xl font-bold mb-4">Statistika</h2>
      <BarChart width={500} height={300} data={statisticsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Statistics;
