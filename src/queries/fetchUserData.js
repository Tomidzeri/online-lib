import libraryAPI from "../utils/api";

export const fetchUserData = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await libraryAPI.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};