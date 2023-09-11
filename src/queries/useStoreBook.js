import libraryAPI from "../utils/api";

export const storeBook = async (bookData) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await libraryAPI.post('/books/store', bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error storing book:', error);
    throw error;
  }
};
