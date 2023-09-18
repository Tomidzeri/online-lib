import React from "react";
import List from "../../components/UI/lists/List";

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
  const activityListData = activitiesData.map((activity, index) => ({
    text: `${activity.title} - ${activity.author} ${activity.action} ${activity.target}, ${activity.date}`,
    key: index,
  }));

  return (
    <div className="mt-20 bg-white">
      <h3 className="text-2xl text-gray-800 mb-4">Activities</h3>
      <List items={activityListData} className="custom-list" />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Show
      </button>
    </div>
  );
};

export default Activities;
