import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBorrowedBooks } from "../../../../../queries/knjige/useBookBorrow";
import { Typography, Paper } from "@mui/material";

const ViewPrekoraceneInfo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [prekoraceneData, setPrekoraceneData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const borrowedBooksData = await fetchBorrowedBooks();

        const matchingPrekoraceneData = borrowedBooksData.prekoracene.filter(
          (item) => item.id === parseInt(id)
        );

        setPrekoraceneData(matchingPrekoraceneData);
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
            {prekoraceneData.map((prekoracene) => (
              <h2 key={prekoracene.id} className="text-4xl font-bold mb-4 p-2 ml-24">
                {prekoracene.knjiga.title}
              </h2>
            ))}
          </div>
        </div>
        {prekoraceneData.length === 0 ? (
          <p>No Izdate transactions found for this book.</p>
        ) : (
          <ul className="list-disc ml-20">
            {prekoraceneData.map((prekoracene) => (
              <li key={prekoracene.id} className="mb-4">
                <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                  <Typography variant="h6">Transaction ID:</Typography>
                  <Typography className="font-bold">{prekoracene.id}</Typography>
                </Paper>
                <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                  <Typography variant="h6">Borrow Date:</Typography>
                  <Typography>{prekoracene.borrow_date}</Typography>
                </Paper>
                <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                  <Typography variant="h6">Bibliotekar:</Typography>
                  <Typography>
                    {prekoracene.bibliotekar0.name} {prekoracene.bibliotekar0.surname}
                  </Typography>
                </Paper>
                <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                  <Typography variant="h6">Ucenik:</Typography>
                  <Typography>
                    {prekoracene.student.name} {prekoracene.student.surname}
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

export default ViewPrekoraceneInfo;
