import libraryAPI from "../../utils/api";

export const ProfileData = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.post("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
      console.log(response.data);
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };
