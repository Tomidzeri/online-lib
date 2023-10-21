import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBorrowedBooks } from "../../../../../queries/knjige/useBookBorrow";
import { Typography, Paper } from "@mui/material";

const ViewVraceneInfo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [vraceneData, setVraceneData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const borrowedBooksData = await fetchBorrowedBooks();

        const matchingVraceneData = borrowedBooksData.vracene.filter(
          (item) => item.id === parseInt(id)
        );

        setVraceneData(matchingVraceneData);
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
            {vraceneData.map((vracene) => (
              <h2 key={vracene.id} className="text-4xl font-bold mb-4 p-2 ml-24">
                {vracene.knjiga.title}
              </h2>
            ))}
          </div>
        </div>
        {vraceneData.length === 0 ? (
          <p>No Izdate transactions found for this book.</p>
        ) : (
          <ul className="list-disc ml-20">
            {vraceneData.map((vracene) => (
              <li key={vracene.id} className="mb-4">
                <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                  <Typography variant="h6">Transaction ID:</Typography>
                  <Typography className="font-bold">{vracene.id}</Typography>
                </Paper>
                <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                  <Typography variant="h6">Borrow Date:</Typography>
                  <Typography>{vracene.borrow_date}</Typography>
                </Paper>
                <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                  <Typography variant="h6">Bibliotekar:</Typography>
                  <Typography>
                    {vracene.bibliotekar0.name} {vracene.bibliotekar0.surname}
                  </Typography>
                </Paper>
                <Paper elevation={3} sx={{ padding: "1rem", margin: "1rem 0" }}>
                  <Typography variant="h6">Ucenik:</Typography>
                  <Typography>
                    {vracene.student.name} {vracene.student.surname}
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

export default ViewVraceneInfo;
