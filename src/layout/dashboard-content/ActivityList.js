import React, { useEffect, useState } from "react";
import { fetchBorrowedBooks } from "../../queries/knjige/useBookBorrow";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ActivityList = () => {
  const [loading, setLoading] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const [activityType, setActivityType] = useState("izdate");

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const borrowedBooksData = await fetchBorrowedBooks();

      setBorrowedBooks(borrowedBooksData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const navigateToActivities = () => {
    navigate("/activities");
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const renderSentence = (activity) => {
    let sentence = "";

    if (activityType === "izdate") {
      sentence = (
        <span>
          <Link to={`/viewuserdetails/${activity.bibliotekar0.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            {activity.bibliotekar0?.name} {activity.bibliotekar0?.surname}
          </Link>{" "}
          je izdao/la knjigu{" "}
          <Link to={`/viewbook/${activity.knjiga.id}`} style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>
            {activity.knjiga.title}
          </Link>{" "}
          uceniku{" "}
          <Link to={`/viewuserdetails/${activity.student.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            {activity.student.name} {activity.student.surname}
          </Link>{" "}
          datuma {formatDate(activity.borrow_date)}
        </span>
      );
    } else if (activityType === "otpisane") {
      sentence = (
        <span>
          <Link to={`/viewuserdetails/${activity.bibliotekar0.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            {activity.bibliotekar0?.name} {activity.bibliotekar0?.surname}
          </Link>{" "}
          je otpisao/la knjigu{" "}
          <Link to={`/viewbook/${activity.knjiga.id}`} style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>
            {activity.knjiga.title}
          </Link>{" "}
          koja je bila izdata uceniku{" "}
          <Link to={`/viewuserdetails/${activity.student.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            {activity.student.name} {activity.student.surname}
          </Link>{" "}
          datuma {formatDate(activity.borrow_date)}
        </span>
      );
    } else if (activityType === "vracene") {
      sentence = (
        <span>
          Ucenik{" "}
          <Link to={`/viewuserdetails/${activity.student.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            {activity.student.name} {activity.student.surname}
          </Link>{" "}
          je vratio/la knjigu{" "}
          <Link to={`/viewbook/${activity.knjiga.id}`} style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>
            {activity.knjiga.title}
          </Link>{" "}
          izdatu od strane{" "}
          <Link to={`/viewuserdetails/${activity.bibliotekar0.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
            {activity.bibliotekar0?.name} {activity.bibliotekar0.surname}
          </Link>{" "}
          datuma {formatDate(activity.borrow_date)}
        </span>
      );
    } else if (activityType === "prekoracene") {
      //  "prekoracene"
    }

    return sentence;
  };

  return (
    <div className="w-full mt-20">
      <h2 className="text-3xl font-bold mb-4">Aktivnosti</h2>
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
        <ul className="mt-4 space-y-2 text-left">
          {borrowedBooks[activityType === "all" ? "izdate" : activityType]
            ?.slice(-7)
            .map((activity, index) => (
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
