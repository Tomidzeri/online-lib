import libraryAPI from "../../utils/api";

const fetchAuthors = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.get("/authors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Assuming the data is an array of authors
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
};

export default fetchAuthors;
