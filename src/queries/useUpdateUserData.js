import libraryAPI from "../utils/api";

function useUpdateUserData() {
  const updateUser = async (userId, updatedUserData) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await libraryAPI.put(`/users/${userId}`, updatedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    }
  };

  return updateUser;
}

export default useUpdateUserData;
