import libraryAPI from "../utils/api";

export const fetchUserProfile = async (token, username) => {
  try {
    const response = await libraryAPI.get(`/users`);

    const userData = response.data.data;

    const user = userData.find((item) => item.username === username);

    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};
