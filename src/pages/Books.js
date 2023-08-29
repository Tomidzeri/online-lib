<<<<<<< HEAD
import React from "react";
import classes from "./Table.css";
import Table from "../components/UI/tables/Table"; // Import the Table component

const Books = () => {
  const tableHeaders = [
    "Book Title",
    "Author",
    "Category",
    "Available",
    "Reserved",
    "Issued",
    "Overdue",
    "Total Quantity",
  ];
  const tableData = [
    ["Dummy Book 1", "John Doe", "Fiction", 10, 2, 6, 1, 15],
    ["Dummy Book 2", "Jane Smith", "Mystery", 5, 1, 3, 0, 9],
    ["Adventure Awaits", "Emily Johnson", "Adventure", 3, 0, 3, 0, 6],
    ["Sci-Fi Chronicles", "Michael Brown", "Science Fiction", 8, 3, 4, 1, 15],
    ["History Reimagined", "Sarah Thompson", "History", 12, 2, 10, 0, 20],
    ["Thrills and Chills", "Alex Turner", "Thriller", 7, 1, 5, 1, 10],
    ["Romantic Getaway", "Olivia White", "Romance", 6, 0, 4, 0, 10],
  ];
=======
import React, { useState, useEffect } from "react";
// import libraryAPI from "../utils/api";
import classes from "./UserList.css";

// const Books = () => {
//   const [books, setBooks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); // Added loading state

//   const fetchBooks = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await libraryAPI.get("/books", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       });
//       const fetchedBooks = response.data.data;
//       setBooks(fetchedBooks);
//       setIsLoading(false);
//       console.log(fetchedBooks);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

const Books = () => {
    const [books, setBooks] = useState([{
            id: 1,
            title: "Dummy Book 1",
            author: "John Doe",
            category: "Fiction",
        },
        {
            id: 2,
            title: "Dummy Book 2",
            author: "Jane Smith",
            category: "Mystery",
        },
    ]);

    const [isLoading, setIsLoading] = useState(false);
>>>>>>> 022d0703b8ff49cc20f4229c0b2d601a7592e3ec

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [setBooks]);

    return ( <
        div className = { classes.users } >
        <
        h2 > Books < /h2> {
            isLoading ? ( <
                p > Loading... < /p>
            ) : ( <
                table style = {
                    { marginTop: "85px" } } >
                <
                thead >
                <
                tr >
                <
                th > Title < /th> <
                th > Author < /th> <
                th > Category < /th> <
                /tr> <
                /thead> <
                tbody > {
                    books.map((item, index) => ( <
                        tr key = { index } >
                        <
                        td > { item.title } < /td> <
                        td > { item.author } < /td> <
                        td > { item.category } < /td> <
                        /tr>
                    ))
                } <
                /tbody> <
                /table>
            )
        } <
        /div>
    );
};

export default Books;