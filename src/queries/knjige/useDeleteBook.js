import libraryAPI from "../../utils/api";

function useDeleteBook() {
  const deleteBook = async (bookId) => {
    try {
      const token = sessionStorage.getItem("token");
      await libraryAPI.delete(`/books/${bookId}/destroy`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return deleteBook;
}

export default useDeleteBook;
