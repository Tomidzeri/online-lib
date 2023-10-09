import libraryAPI from "../../utils/api";

export const fetchBorrowedBooks = async () => {
  try {
    const response = await libraryAPI.get("/books/borrows");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
