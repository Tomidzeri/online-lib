import { useParams } from 'react-router-dom';
import useAuthorDetails from "../../../queries/useAuthorDetails";
import "../userActions/ViewUserDetails.css";

const ViewAuthorDetails = () => {
  const { authorId } = useParams();
  const author = useAuthorDetails(authorId);

  if (!author) {
    return <div className="loading">Loading...</div>; 
  }

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
        <strong>Biography:</strong> {author.biography}
      </div>
      <div>
        <strong>Image:</strong> {author.image}
      </div>
    </div>
  );
};

export default ViewAuthorDetails;
