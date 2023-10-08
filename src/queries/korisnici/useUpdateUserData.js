import libraryAPI from "../../utils/api";

const updateUserData = async (userId, updatedUserData) => {
  try {
     
    const response = await libraryAPI.put(`/users/${userId}`, updatedUserData,   );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default updateUserData;
