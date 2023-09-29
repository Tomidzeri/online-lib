// PolisaTab.js
import React from "react";
import ReusableTable from "../../tables/BorrowsTable";

const PolisaTab = () => {
  return (
    <div>
      <h3>Polisa</h3>
      <ReusableTable />
      {/* Add content specific to the Polisa tab here */}
    </div>
  );
};

export default PolisaTab;
