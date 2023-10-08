import libraryAPI from "../../utils/api";

export const writeOffBook = async (bookIds) => {
  try {
     
    const response = await libraryAPI.post("/books/otpisi", {
      toWriteoff: bookIds,
    },   );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
