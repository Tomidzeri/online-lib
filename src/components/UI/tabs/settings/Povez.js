import React from "react";
import SettTable from "../../tables/SettingsTable";

const PovezTab = () => {
  const tableHeader = ["Naziv poveza"];
  const dataTable = [
    ["Tvrdi povez"],
    ["Meki povez"],
    ["Koricenje spiralom"],
    ["Klamovanje"],
    ["Kozni povez"],
    ["Umjetnicki povez"],
    ["Francuski povez"],
  ];

  return (
    <div className="w-full">
       <SettTable tableHead={tableHeader} tableData={dataTable} />
    </div>
  );
};

export default PovezTab;
