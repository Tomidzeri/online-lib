import libraryAPI from "../utils/api";

export const fetchUserData = async (userId) => {
  try {

    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;

  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};