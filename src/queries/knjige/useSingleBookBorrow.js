import libraryAPI from "../../utils/api";

export const borrowBook = async (bookId, borrowedBookData) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.post(`/books/${bookId}/izdaj`, borrowedBookData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
