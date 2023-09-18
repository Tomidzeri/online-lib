import React from "react";
import List from "../../components/UI/lists/List";

const reservationsData = [
  {
    user: "Pero Perovic",
    book: "Tom Sojer",
    date: "31.04.2019",
  },
  {
    user: "Pero Perovic",
    book: "Ilijada",
    date: "05.11.2020",
  },
  {
    user: "Pero Perovic",
    book: "Tom Sojer",
    date: "31.02.2021",
  },
];

const Reservations = () => {
  const reservationListData = reservationsData.map((reservation, index) => ({
    text: `${reservation.book} - Reserved by ${reservation.user}, ${reservation.date}`,
    key: index,
  }));

  return (
    <div className="mt-20 p-10 bg-white">
      <h3 className="text-2xl text-gray-800 mb-4">Reservations (Books)</h3>
      <List items={reservationListData} className="custom-list" />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Show More
      </button>
    </div>
  );
};

export default Reservations;
