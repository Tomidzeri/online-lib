import libraryAPI from "../utils/api";

export const fetchBooks = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.get("/books", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};