// PolisaTab.js
import React from "react";
import ReusableTable from "../../tables/BorrowsTable";

const PovezTab = () => {
  return (
    <div>
      <h3>Povez</h3>
      <ReusableTable />
      {/* Add content specific to the Polisa tab here */}
    </div>
  );
};

export default PovezTab;
