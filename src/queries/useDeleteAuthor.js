import libraryAPI from "../utils/api";

function useDeleteAuthor() {
  const deleteAuthor = async (authorId) => {
    try {
      const token = sessionStorage.getItem("token");
      await libraryAPI.delete(`/authors/${authorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  return deleteAuthor;
}

export default useDeleteAuthor;
