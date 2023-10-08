import libraryAPI from "../../utils/api";

export const returnBook = async (bookIds) => { 
  try {
     
    const response = await libraryAPI.post("/books/vrati", {
      toReturn: bookIds, 
    },   );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
