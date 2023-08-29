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
  const [books, setBooks] = useState([
    {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  
    return () => {
      clearTimeout(timer); 
    };
  }, [setBooks]);

  return (
    <div className={classes.users}>
      <h2>Books</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {books.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>{item.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Books;
