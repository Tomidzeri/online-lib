import React from "react";
import SettTable from "../../tables/SettingsTable";

const PismoTab = () => {
  const tableHeader = ["Naziv pisma"];
  const dataTable = [
    ["Cirilica"],
    ["Latinica"],
    ["Cirilica"],
    ["Latinica"],
    ["Cirilica"],
    ["Latinica"],
  ];

  return (
    <div className="w-full">
       <SettTable tableHead={tableHeader} tableData={dataTable} />
    </div>
  );
};

export default PismoTab;
