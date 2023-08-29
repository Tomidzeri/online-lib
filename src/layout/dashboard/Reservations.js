import Table from "../../components/UI/tables/Table";import React from "react";
import "./Reservations.css";

const reservationsData = [
  {
    user: "Pero Perovic",
    book: "Tom Sojer",
    date: "31.04.2019"
  },
  {
    user: "Pero Perovic",
    book: "Ilijada",
    date: "05.11.2020"
  },
  {
    user: "Pero Perovic",
    book: "Tom Sojer",
    date: "31.02.2021"
  },
  // You can add more data entries here
];

const Reservations = () => {
  const headers = ["User", "Book", "Date"];
  const data = reservationsData.map(reservation => [
    reservation.user,
    reservation.book,
    reservation.date
  ]);

  return (
    <div className="reservations-container">
      <h3 className="reservations-title">Reservations (Books)</h3>
      <Table headers={headers} data={data} />
      <button>Show More</button>
    </div>
  );
};

export default Reservations;
