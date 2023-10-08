import libraryAPI from "../../utils/api";

export const fetchBooks = async () => {
  try {
     
    const response = await libraryAPI.get("/books",   );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};