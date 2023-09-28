import libraryAPI from "../../utils/api";

export const AllReservations = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await libraryAPI.get("/books/reservations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching book data:", error);
    throw error;
  }
};