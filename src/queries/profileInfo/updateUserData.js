import libraryAPI from "../../utils/api";

export const UpdateUser = async (updatedUserData) => {
  try {
     
    const response = await libraryAPI.put("/users/me", updatedUserData);

    const data = response.data;

    console.log(data);

    return data;
  } catch (error) {
    throw error;
  }
};
