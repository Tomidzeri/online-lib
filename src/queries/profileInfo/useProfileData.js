import libraryAPI from "../../utils/api";

export const profileData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await libraryAPI.post(`/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const userData = response.data.data;
  
      console.log(userData);
  
      return userData;
    } catch (error) {
      throw error;
    }
  };
