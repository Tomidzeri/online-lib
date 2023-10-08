import libraryAPI from "../../utils/api";

export const borrowBook = async (bookId, borrowedBookData) => {
  try {
     
    const response = await libraryAPI.post(`/books/${bookId}/izdaj`, borrowedBookData,   );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
