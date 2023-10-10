import libraryAPI from "../../utils/api";

export const fetchBookData = async (bookId) => {
  try {
    console.log(bookId);

    const response = await libraryAPI.get(`/books/${bookId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching book data:", error);
    throw error;
  }
};
