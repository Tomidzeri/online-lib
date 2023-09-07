import libraryAPI from "../utils/api";

export const createBook = async (bookData) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await libraryAPI.get('/books/create', bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw error;
  }
};
