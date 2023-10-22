import React from "react";
import SettTable from "../../tables/SettingsTable";

const ZanroviTab = () => {
  const tableHeader = ["Naziv zanra"];
  const dataTable = [
    ["Poezija"],
    ["Strucna literatura"],
    ["Poezija"],
    ["Strucna literatura"],
    ["Poezija"],
    ["Strucna literatura"],
  ];

  return (
    <div>
      <SettTable tableHead={tableHeader} tableData={dataTable} />
    </div>
  );
};

export default ZanroviTab;
