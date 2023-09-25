import { useParams } from "react-router-dom";
import useAuthorDetails from "../../../../queries/autori/useAuthorDetails";
import "../userActions/ViewUserDetails.css";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Paper } from "@mui/material";

const ViewAuthorDetails = () => {
  const { authorId } = useParams();
  const author = useAuthorDetails(authorId);
  const navigate = useNavigate();

  if (!author) {
    return <div className="loading">Loading...</div>;
  }

  const handleBackClick = () => {
    navigate(`/authors`);
  };

  return (
    <div className="main-content mt-24 ml-20 flex flex-col content-end">
      <div className="w-full">
        <div className="flex flex-col justify-baseline items-baseline border-b border-gray-300 mb-14 text-center">
          <Typography variant="h4" align="center" gutterBottom>
            {author?.name} {author.surname}
          </Typography>
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700"
            onClick={handleBackClick}
          >
            Evidencija Autora
          </button>
        </div>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: "2rem", marginBottom: "2rem" }}>
              <Typography variant="h6">Ime i prezime:</Typography>
              <Typography>
                {author.name} {author.surname}
              </Typography>
            </Paper>
            <Paper elevation={3} sx={{ padding: "2rem", marginBottom: "2rem" }}>
              <Typography variant="h6">Biografija:</Typography>
              <div dangerouslySetInnerHTML={{ __html: author.bio }} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ViewAuthorDetails;