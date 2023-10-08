import libraryAPI from "../../utils/api";
function useCreateUser() {
  const createUser = async (userData) => {
    try {
       
      const response = await libraryAPI.post("/users/store", userData);

      return response.data;
    } catch (error) {
      console.error("Error adding user:", error);
      return null;
    }
  };

  return createUser;
}

export default useCreateUser;
