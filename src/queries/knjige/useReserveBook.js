import libraryAPI from "../../utils/api";

export const reserveBook = async (bookId, reservedBookData) => {
  try {
     
    const response = await libraryAPI.post(`/books/${bookId}/reserve`, reservedBookData,   );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
