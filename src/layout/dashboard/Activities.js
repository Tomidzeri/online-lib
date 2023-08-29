import React from "react";
import Table from "../../components/UI/tables/Table";
import "./Activities.css";

const activitiesData = [
  {
    title: "Robinson Kruso",
    author: "Valentina K.",
    action: "izdala knjigu",
    target: "Petru Njegosu",
    date: "12.03.2020",
  },
  {
    title: "Tom Sojer",
    author: "Valentina K.",
    action: "izdala knjigu",
    target: "Peru Perovicu",
    date: "21.02.2021",
  },
  // You can add more data entries here
];

const Activities = () => {
  const headers = ["Author", "Action", "Title", "Target", "Date"];
  const data = activitiesData.map((activity) => [
    activity.author,
    activity.action,
    activity.title,
    activity.target,
    activity.date,
  ]);

  return (
    <div className="activities-container">
      <h3 className="activities-title">Activities</h3>
      <Table headers={headers} data={data} />
      <button>Show More</button>
    </div>
  );
};

export default Activities;
