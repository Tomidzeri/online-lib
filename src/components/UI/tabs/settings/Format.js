import React from "react";
import SettTable from "../../tables/SettingsTable";

const FormatTab = () => {
  const tableHeader = ["Naziv formata"];
  const dataTable = [
    ["A1"],
    ["A2"],
    ["A3"],
    ["A4"],
    ["A5"],
    ["A6"],
  ];

  return (
    <div className="w-full">
       <SettTable tableHead={tableHeader} tableData={dataTable} />
    </div>
  );
};


export default FormatTab;
