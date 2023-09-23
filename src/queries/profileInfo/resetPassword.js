// resetPassword.js

import libraryAPI from "../../utils/api";

export const resetPassword = async (token, username, passwordData) => {
  try {
    const response = await libraryAPI.put(`/users/${username}/reset-password`, passwordData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to reset password");
    }

    const data = response.data;

    return data;
  } catch (error) {
    throw error;
  }
};
