import React from "react";
import List from "../../components/UI/lists/List";
import "./Activities.css";

const activitiesData = [{
        title: "Rent",
        author: "Robinson Kruso",
        action: "for",
        target: "Petar Njegos",
        date: "12.03.2020",
    },
    {
        title: "Rent",
        author: "The shinning",
        action: "for",
        target: "Pero Perovic",
        date: "21.02.2021",
    },
    {
        title: "Return",
        author: "John Doe",
        action: "from",
        target: "Jane Smith",
        date: "05.09.2022",
    },
    {
        title: "Exhhibiton",
        author: "",
        action: "Books of Stephen King",
        target: "",
        date: "30.11.2023",
    },
];

const Activities = () => {
<<<<<<< HEAD:src/layout/dashboard-content/Activities.js
  const activityListItems = activitiesData.map((activity, index) => (
    <div key={index} className="activity-item">
      <div className="activity-header">
        <span className="activity-title">{activity.title}</span>
        <span className="activity-date">{activity.date}</span>
      </div>
      <div className="activity-details">
        {`${activity.author} ${activity.action} ${activity.target}`}
      </div>
    </div>
  ));

  return (
    <div className="activities-container">
      <h3 className="activities-title">Activities</h3>
      <List items={activityListItems} className="custom-list" />
      <button>Show</button>
    </div>
  );
=======
    const activityListItems = activitiesData.map((activity, index) => ( <
        ul className = "activity-list" >
        <
        li key = { index }
        className = "activity-item" >
        <
        div className = "activity-header" >
        <
        span className = "activity-title" > { activity.title } < /span> <
        span className = "activity-date" > { activity.date } < /span> <
        /div> <
        div className = "activity-details" > { `${activity.author} ${activity.action} ${activity.target}` } <
        /div> <
        /li> <
        /ul>
    ));

    return ( <
        div className = "activities-container" >
        <
        h3 className = "activities-title" > Activities < /h3> <
        List items = { activityListItems }
        className = "custom-list" / >
        <
        button className = "button" > Show More < /button> <
        /div>
    );
>>>>>>> eb74f6a79c9477e4435551fb532fd862c09954af:src/layout/dashboard/Activities.js
};

export default Activities;