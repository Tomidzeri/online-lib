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

  return (
    <div className={classes.users}>
      <h2>Books</h2>
      <Table headers={tableHeaders} data={tableData} />
    </div>
  );
};

export default Books;
