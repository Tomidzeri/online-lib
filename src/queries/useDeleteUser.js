import libraryAPI from "../utils/api";

function useDeleteUser() {
  const deleteUser = async (userId) => {
    try {
      const token = sessionStorage.getItem("token");
      await libraryAPI.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return deleteUser;
}

export default useDeleteUser;
