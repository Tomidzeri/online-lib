import libraryAPI from "../../utils/api";

export const ProfileData = async () => {
  try {
    const response = await libraryAPI.post(`/users/me`);

    const user = response.data;

    console.log(user);

    return response;
  } catch (error) {
    throw error;
  }
};
