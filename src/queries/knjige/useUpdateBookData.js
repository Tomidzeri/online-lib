import libraryAPI from "../../utils/api";

const updateBookData = async (bookId, updatedBookData) => {
  try {
     
    const response = await libraryAPI.post(`/books/${bookId}/update`, updatedBookData, {
       
      params: {
        deletePdfs: 0,
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateBookData;
