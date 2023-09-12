import libraryAPI from "../utils/api";

export const fetchAuthorData = async (authorId) => {
  try {

    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.get(`/authors/${authorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;

  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};