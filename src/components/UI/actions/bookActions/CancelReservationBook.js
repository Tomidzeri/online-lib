import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelReservation from "../../../../queries/knjige/useCancelReservation";
import { TiTick } from "react-icons/ti";
import { GiCrossMark } from "react-icons/gi";

const CancelReservationAction = ({ book, onCancel }) => {
  const cancelReservation = CancelReservation();

  const handleCancel = () => {
    toast.warning(
      <>
        <div style={{ textAlign: "center" }}>
          <p>Da li ste sigurni da želite da otkažete rezervaciju knjige:</p>
          <p>
            <span style={{ fontWeight: "bold", textAlign: "center" }}>
              {book.title}
            </span>
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <button
            onClick={async () => {
              try {
                await cancelReservation(book.id);
                onCancel(book.id);
                toast.dismiss();
              } catch (error) {
                console.error("Error canceling reservation book:", error);
                toast.error("Greška pri otkazivanju rezervacije.");
              }
            }}
            style={{ color: "red" }}
          >
            <TiTick />
          </button>
          <button
            onClick={() => {
              toast.dismiss();
            }}
            style={{ color: "blue" }}
          >
            <GiCrossMark />
          </button>
        </div>
      </>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };

  return (
    <div>
      <button onClick={handleCancel}>Otkaži rezervaciju</button>
    </div>
  );
};

export default CancelReservationAction;
