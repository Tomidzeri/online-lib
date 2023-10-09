import libraryAPI from "../../utils/api";

export const AllReservations = async () => {
  try {
    const response = await libraryAPI.get("/books/reservations");
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
