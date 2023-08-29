import React, { useState } from "react";
import classes from "./UserList.css";
import Table from "../components/UI/tables/Table"; // Import the Table component

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

  const tableHeaders = ["ID", "Title", "Author", "Category"];
  const tableData = books.map((book) => [
    book.id,
    book.title,
    book.author,
    book.category,
  ]);

  return (
    <div className={classes.users}>
      <h2>Books</h2>
      <Table headers={tableHeaders} data={tableData} />
    </div>
  );
};

export default Books;
