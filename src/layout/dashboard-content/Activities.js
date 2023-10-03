import React, { useState, useEffect } from "react";
import SortList from "../../components/UI/sort/SortList";

const Activities = () => {
  const [filteredActivities, setFilteredActivities] = useState([]);

  useEffect(() => {
    // Replace this with your actual data fetching logic
    const fetchData = async () => {
      try {
        const response = await fetch("your_api_endpoint_here");
        const data = await response.json();

        // Assuming data is an array of activities with a "date" property
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        const latest8Activities = sortedData.slice(0, 8);

        setFilteredActivities(latest8Activities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-16 ml-15">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full pb-4 mb-4">
          <h3 className="text-4xl font-bold text-left ml-20">Aktivnosti</h3>
        </div>
        <div className="ml-20">
          {/* Pass the filtered activities as a prop */}
          <SortList filteredActivities={filteredActivities} />
        </div>
      </div>
    </div>
  );
};

export default Activities;
