import React from "react";
import SortList from "../../components/UI/sort/SortList";

const Activities = () => {
  return (
    <div className="mt-16 ml-15">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full pb-4 mb-4">
          <h3 className="text-4xl font-bold text-left ml-20">Aktivnosti</h3>
        </div>
        <div className="ml-20">
          <SortList />
        </div>
      </div>
    </div>
  );
};

export default Activities;
