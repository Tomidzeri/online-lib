import libraryAPI from "../../utils/api";

function useBulkDeleteBooks() {
  const bulkDeleteBooks = async (bookIds) => {
    try {
      if (!Array.isArray(bookIds) || bookIds.length === 0) {
        throw new Error("Invalid input: bookIds must be an array of book IDs.");
      }

      await libraryAPI.del('/books/bulkdelete', { data: { bookIds } });
    } catch (error) {
      console.error("Error deleting books in bulk:", error);
    }
  };

  return bulkDeleteBooks;
}

export default useBulkDeleteBooks;
