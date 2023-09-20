import libraryAPI from "../utils/api";

export const fetchUserProfile = async (token, username) => {
  try {
    const response = await libraryAPI.get(`/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json; charset=utf-8",
      },
    });

    const userData = response.data.data;

    // Find the user with the specified username
    const user = userData.find((item) => item.username === username);

    return user;
  } catch (error) {
    throw error;
  }
};
