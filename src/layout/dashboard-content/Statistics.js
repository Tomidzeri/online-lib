import React, { useEffect, useState } from "react";
import "./Statistics.css";
import { fetchBorrowedBooks } from "../../queries/knjige/useBookBorrow";
import { AllReservations } from "../../queries/knjige/useAllReservations";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { format } from "date-fns";

const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState({
    issuedBooks: 0,
    reservedBooks: 0,
    overdueBooks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetchBorrowedBooks()
      .then((data) => {
        const issuedBooks = data.izdate.length;
        const overdueBooks = data.prekoracene.length;

        AllReservations()
          .then((reservationData) => {
            const reservedBooks = reservationData.active.length;

            setStatisticsData({
              issuedBooks,
              reservedBooks,
              overdueBooks,
            });

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
    <div className="statistics-container">
      <h3 className="statistics-title">Statistics</h3>
      <div className="statistics-row">
        <div className="statistics-label">Issued Books:</div>
        <div className="bar-fill fill-1" style={{ width: `${(statisticsData.issuedBooks / 100) * 100}%` }}>
          {statisticsData.issuedBooks}
        </div>
      </div>
      <div className="statistics-row">
        <div className="statistics-label">Reserved Books:</div>
        <div className="bar-fill fill-2" style={{ width: `${(statisticsData.reservedBooks / 100) * 100}%` }}>
          {statisticsData.reservedBooks}
        </div>
      </div>
      <div className="statistics-row">
        <div className="statistics-label">Overdue Books:</div>
        <div className="bar-fill fill-3" style={{ width: `${(statisticsData.overdueBooks / 100) * 100}%` }}>
          {statisticsData.overdueBooks}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
