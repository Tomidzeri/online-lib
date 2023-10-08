import libraryAPI from "../../utils/api";

const updateAuthorData = async (authorId, updatedAuthorData) => {
  try {
     
    const response = await libraryAPI.put(`/authors/${authorId}`, updatedAuthorData,   );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateAuthorData;
