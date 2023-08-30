import React from "react";
import List from "../../components/UI/lists/List";
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
  {
    title: "Lorem Ipsum",
    author: "John Doe",
    action: "created content",
    target: "Jane Smith",
    date: "05.09.2022",
  },
  {
    title: "Example Event",
    author: "Alice Johnson",
    action: "scheduled event",
    target: "Bob Williams",
    date: "30.11.2023",
  },
  {
    title: "Project Completion",
    author: "Sam Wilson",
    action: "completed project",
    target: "Jennifer Adams",
    date: "18.09.2025",
  },
];

const Activities = () => {
  const activityListItems = activitiesData.map((activity, index) => (
    <ul className="activity-list">
      <li key={index} className="activity-item">
        <div className="activity-header">
          <span className="activity-title">{activity.title}</span>
          <span className="activity-date">{activity.date}</span>
        </div>
        <div className="activity-details">
          {`${activity.author} ${activity.action} ${activity.target}`}
        </div>
      </li>
    </ul>
  ));

  return (
    <div className="activities-container">
      <h3 className="activities-title">Activities</h3>
      <List items={activityListItems} className="custom-list" />
      <button>Show More</button>
    </div>
  );
};

export default Activities;
