import libraryAPI from "../utils/api";

export const fetchUserProfile = async (token, username) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.get(`/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = response.data.data;

    const user = userData.find((item) => item.username === username);

    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};
