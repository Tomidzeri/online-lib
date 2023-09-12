import libraryAPI from "../utils/api";

const updateAuthorData = async (authorId, updatedAuthorData) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.put(`/authors/${authorId}`, updatedAuthorData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateAuthorData;
