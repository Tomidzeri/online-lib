import { useParams } from 'react-router-dom';
import useAuthorDetails from "../../../queries/useAuthorDetails";
import "../userActions/ViewUserDetails.css";
import Button from '../buttons/Button';
import { useNavigate } from 'react-router-dom';

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
    <div className="user-details">
      <h2>Author Details</h2>
      <div>
        <strong>Name:</strong> {author.name}
      </div>
      <div>
        <strong>Surname:</strong> {author.surname}
      </div>
      <div>
        <strong>Biography:</strong> {author.bio}
      </div>
      <Button onClick={handleBackClick}>
        Go back
      </Button>
    </div>
  );
};

export default ViewAuthorDetails;
