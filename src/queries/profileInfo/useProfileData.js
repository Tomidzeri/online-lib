import libraryAPI from "../../utils/api";

export const ProfileData = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.post(`/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response.data;
  
      console.log(user);
  
      return response;
    } catch (error) {
      throw error;
    }
  };
