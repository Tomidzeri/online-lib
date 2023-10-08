import libraryAPI from "../../utils/api";

function useCreateAuthor() {
  const createAuthor = async (authorData) => {
    try {
       
      const response = await libraryAPI.post("/authors/store", authorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return createAuthor;
}

export default useCreateAuthor;
