import libraryAPI from "../../utils/api";

function CancelReservation() {
  const deleteBook = async (bookId) => {
    try {
      const token = sessionStorage.getItem("token");
      await libraryAPI.delete(`/books/reservations/${bookId}/destroy`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error canceling reservation book:", error);
    }
  };

  return deleteBook;
}

export default CancelReservation;
