import libraryAPI from "../../utils/api";

export const fetchUserData = async (userId) => {
  try {

     
    const response = await libraryAPI.get(`/users/${userId}`,   );
    console.log(response.data.data);
    return response.data.data;

  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};