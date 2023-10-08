import React, { useEffect, useState } from "react";
import { fetchBorrowedBooks } from "../../queries/knjige/useBookBorrow";
import { useNavigate } from "react-router-dom";

const ActivityList = () => {
  const [loading, setLoading] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  
  // Set the initial value to 'all' to show all activities by default
  const [activityType, setActivityType] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchBorrowedBooks()
      .then((data) => {
        setBorrowedBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching borrowed books:", error);
        setLoading(false);
      });
  }, []);

  const navigateToActivities = () => {
    navigate("/activities");
  };

  const renderSentence = (activity) => {
    let sentence = "";

    if (activityType === "izdate") {
      sentence = `${activity.bibliotekar0?.name} ${activity.bibliotekar0?.surname} je izdao/la knjigu ${activity.knjiga.title} uceniku ${activity.student.name} ${activity.student.surname} datuma ${activity.borrow_date}`;
    } else if (activityType === "otpisane") {
      sentence = `${activity.bibliotekar0?.name} ${activity.bibliotekar0?.surname} je otpisao/la knjigu ${activity.knjiga.title} koja je bila izdata uceniku ${activity.student.name} ${activity.student.surname} datuma ${activity.borrow_date}`;
    } else if (activityType === "vracene") {
      sentence = `Ucenik ${activity.student.name} ${activity.student.surname} je vratio/la knjigu ${activity.knjiga.title} izdatu od strane ${activity.bibliotekar0?.name} ${activity.bibliotekar0.surname} datuma ${activity.return_date}`;
    } else if (activityType === "prekoracene") {
      // Handle "prekoracene" case
    }

    return sentence;
  };

  return (
    <div className="w-full mt-20">
      <h2 className="text-2xl font-bold mb-4">Aktivnosti</h2>
      <div className="space-x-4">
        <button
          onClick={() => setActivityType("izdate")}
          className={`${
            activityType === "izdate" ? "bg-blue-500 text-white" : "bg-gray-300"
          } px-4 py-2 rounded-md`}
        >
          Izdate
        </button>
        <button
          onClick={() => setActivityType("otpisane")}
          className={`${
            activityType === "otpisane"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          } px-4 py-2 rounded-md`}
        >
          Otpisane
        </button>
        <button
          onClick={() => setActivityType("vracene")}
          className={`${
            activityType === "vracene"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          } px-4 py-2 rounded-md`}
        >
          Vracene
        </button>
        <button
          onClick={() => setActivityType("prekoracene")}
          className={`${
            activityType === "prekoracene"
              ? "bg-blue-500 text-white"
              : "bg-gray-300"
          } px-4 py-2 rounded-md`}
        >
          Prekoracene
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {borrowedBooks[activityType === "all" ? "izdate" : activityType]?.slice(-7).map((activity, index) => (
            <li key={index} className="bg-white rounded-md shadow-md p-4">
              {renderSentence(activity)}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={navigateToActivities}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Prikazi vise
      </button>
    </div>
  );
};

export default ActivityList;
