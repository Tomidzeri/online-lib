import React from "react";
import useDeleteAuthor from "../../../../queries/autori/useDeleteAuthor"; 

const DeleteAuthor = ({ author, onDelete }) => {
  const deleteAuthor = useDeleteAuthor(); 

  const handleDelete = () => {
    deleteAuthor(author.id); 
    onDelete(author.id); 
  };

  return (
    <div>
      {/* <p>Are you sure you want to delete {author.name}?</p> */}
      <button onClick={handleDelete}>Delete author</button>
    </div>
  );
};

export default DeleteAuthor;
