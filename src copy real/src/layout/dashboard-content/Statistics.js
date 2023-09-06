import React from "react";
import "./Statistics.css";

const statisticsData = {
  issuedBooks: 73,
  reservedBooks: 44,
  overdueBooks: 25
};

const Statistics = () => {
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
