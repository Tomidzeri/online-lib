import React from "react";
import SettTable from "../../tables/SettingsTable";

const IzdavacTab = () => {
  const tableHeader = ["Naziv izdavaca"];
  const dataTable = [
    ["Izdavac 1"],
    ["Izdavac 2"],
    ["Izdavac 3"],
    ["Izdavac 4"],
    ["Izdavac 5"],
    ["Izdavac 6"],
  ];

  return (
    <div className="w-full">
       <SettTable tableHead={tableHeader} tableData={dataTable} />
    </div>
  );
};

export default IzdavacTab;

