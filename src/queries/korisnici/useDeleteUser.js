import libraryAPI from "../../utils/api";

function useDeleteUser() {
  const deleteUser = async (userId) => {
    try {
       
      await libraryAPI.delete(`/users/${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return deleteUser;
}

export default useDeleteUser;
