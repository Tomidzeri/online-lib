import libraryAPI from "../utils/api";

export const fetchBookData = async (bookId) => {
  try {

    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.get(`/books/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;

  } catch (error) {
    console.error("Error fetching book data:", error);
    throw error;
  }
};