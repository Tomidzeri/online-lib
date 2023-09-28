import libraryAPI from "../../utils/api";

export const UpdateUser = async (updatedUserData) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.put("/users/me", updatedUserData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data.data;

    console.log(data);

    return data;
  } catch (error) {
    throw error;
  }
};
