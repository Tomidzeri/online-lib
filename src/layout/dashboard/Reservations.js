import React from "react";
import List from "../../components/UI/lists/List"; // Import the List component
import "./Reservations.css";

const reservationsData = [{
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
        book: "World at war",
        date: "31.02.2021"
    },
    // You can add more data entries here
];

const Reservations = () => {
    const reservationListItems = reservationsData.map((reservation, index) => ( <
        li key = { index }
        className = "reservation-item" >
        <
        div className = "reservation-header" >
        <
        span className = "reservation-book" > { reservation.book } < /span> <
        span className = "reservation-date" > { reservation.date } < /span> <
        /div> <
        div className = "reservation-details" > { `Reserved by ${reservation.user}` } <
        /div> <
        /li>
    ));

    return ( <
        div className = "reservations-container" >
        <
        h3 className = "reservations-title" > Reservations(Books) < /h3> <
        List items = { reservationListItems }
        className = "custom-list" / > { /* Use the List component here */ } <
        button className = "button" > Show More < /button> <
        /div>
    );
};

export default Reservations;