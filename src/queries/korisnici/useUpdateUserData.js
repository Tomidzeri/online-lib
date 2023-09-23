import libraryAPI from "../../utils/api";

const updateUserData = async (userId, updatedUserData) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.put(`/users/${userId}`, updatedUserData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateUserData;
