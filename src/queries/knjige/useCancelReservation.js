import libraryAPI from "../../utils/api";

function CancelReservation() {
  const deleteBook = async (bookId) => {
    try {
       
      await libraryAPI.delete(`/books/reservations/${bookId}/destroy`);
    } catch (error) {
      console.error("Error canceling reservation book:", error);
    }
  };

  return deleteBook;
}

export default CancelReservation;
