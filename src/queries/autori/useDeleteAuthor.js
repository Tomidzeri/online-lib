import libraryAPI from "../../utils/api";

function useDeleteAuthor() {
  const deleteAuthor = async (authorId) => {
    try {
       
      await libraryAPI.delete(`/authors/${authorId}`);
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  return deleteAuthor;
}

export default useDeleteAuthor;
