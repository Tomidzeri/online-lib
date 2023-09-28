import libraryAPI from "../../utils/api";

export const reserveBook = async (bookId, reservedBookData) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.post(`/books/${bookId}/reserve`, reservedBookData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
