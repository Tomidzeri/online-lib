import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBorrowedBooks } from "../../../../../queries/knjige/useBookBorrow";
import { Typography, Paper } from "@mui/material";

const ViewIzdateInfo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [izdateData, setIzdateData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const borrowedBooksData = await fetchBorrowedBooks();

        const matchingIzdateData = borrowedBooksData.izdate.filter(
          (item) => item.id === parseInt(id)
        );

        setIzdateData(matchingIzdateData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching borrowed books data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="mt-14 flex flex-row">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full flex flex-row justify-between">
          <div className="flex items-center content-center">
            {izdateData.map((izdate) => (
              <h2 key={izdate.id} className="text-4xl font-bold mb-4 p-2 ml-24">
                {izdate.knjiga.title}
              </h2>
            ))}
          </div>
        </div>
        {izdateData.length === 0 ? (
          <p>No Izdate transactions found for this book.</p>
        ) : (
          <ul className="list-disc ml-20">
            {izdateData.map((izdate) => (
              <li key={izdate.id} className="mb-4">
                <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                  <Typography variant="h6">Transaction ID:</Typography>
                  <Typography className="font-bold">{izdate.id}</Typography>
                </Paper>
                <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                  <Typography variant="h6">Borrow Date:</Typography>
                  <Typography>{izdate.borrow_date}</Typography>
                </Paper>
                <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                  <Typography variant="h6">Bibliotekar:</Typography>
                  <Typography>
                    {izdate.bibliotekar0.name} {izdate.bibliotekar0.surname}
                  </Typography>
                </Paper>
                <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                  <Typography variant="h6">Ucenik:</Typography>
                  <Typography>
                    {izdate.student.name} {izdate.student.surname}
                  </Typography>
                </Paper>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewIzdateInfo;
