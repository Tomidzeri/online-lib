import libraryAPI from "../../utils/api";

function useCreateAuthor() {
  const createAuthor = async (authorData) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await libraryAPI.post("/authors/store", authorData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return createAuthor;
}

export default useCreateAuthor;
