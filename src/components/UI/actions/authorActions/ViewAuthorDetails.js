import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAuthorDetails from "../../../../queries/autori/useAuthorDetails";
import "../userActions/ViewUserDetails.css";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Paper } from "@mui/material";
import AuthorDropdownList from "./authorDropdown";
import useDeleteAuthor from "../../../../queries/autori/useDeleteAuthor";

const ViewAuthorDetails = () => {
  const [authors, setAuthors] = useState([]);
  const { authorId } = useParams();
  const author = useAuthorDetails(authorId);
  const navigate = useNavigate();
  const deleteAuthor = useDeleteAuthor();

  const handleDeleteAuthor = (authorId) => {
    deleteAuthor(authorId);
    const updatedAuthors = authors.filter((author) => author.id !== authorId);
    setAuthors(updatedAuthors);
  };

  if (!author) {
    return <div className="loading">Loading...</div>;
  }

  const handleBackClick = () => {
    navigate(`/authors`);
  };

  return (
    <div className="mt-14">
      <div className="w-full">
        <div className="flex justify-between items-center border-b border-gray-300 w-full">
          <div className="flex flex-col justify-baseline items-baseline">
            <h2
              style={{ fontFamily: "'Rubik', sans-serif" }}
              className="text-5xl font-medium text-left ml-20"
            >
              {author?.name} {author.surname}
            </h2>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700"
              onClick={handleBackClick}
            >
              Evidencija Autora
            </button>
          </div>
          <div>
            <div className="flex">
              <div className="border-l h-10 border-gray-400 mr-8"></div>
              <AuthorDropdownList
                author={author}
                onDelete={() => handleDeleteAuthor(author.id)}
              />
            </div>
          </div>
        </div>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ marginLeft: "5rem", marginTop: "1.5rem" }}
          >
            <Paper elevation={3} sx={{ padding: "2rem", marginBottom: "2rem" }}>
              <Typography
                variant="h6"
                style={{ opacity: 0.5, fontSize: "16px" }}
              >
                Ime i prezime:
              </Typography>

              <Typography>
                {author.name} {author.surname}
              </Typography>
            </Paper>
            <Paper elevation={3} sx={{ padding: "2rem", marginBottom: "2rem" }}>
              <Typography
                variant="h6"
                style={{ opacity: 0.5, fontSize: "16px" }}
              >
                Biografija:
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: author.bio }} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ViewAuthorDetails;
