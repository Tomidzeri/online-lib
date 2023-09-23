// updateUserData.js

import libraryAPI from "../../utils/api";

export const updateUserData = async (userId, updatedUserData) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.put(`/users/${userId}`, updatedUserData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update user data");
    }

    const data = response.data;

    return data;
  } catch (error) {
    throw error;
  }
};
