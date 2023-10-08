import libraryAPI from "../../utils/api";

function useDeleteBook() {
  const deleteBook = async (bookId) => {
    try {
       
      await libraryAPI.delete(`/books/${bookId}/destroy`);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return deleteBook;
}

export default useDeleteBook;
