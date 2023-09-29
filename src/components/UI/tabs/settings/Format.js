// PolisaTab.js
import React from "react";
import ReusableTable from "../../tables/BorrowsTable";

const FormatTab = () => {
  return (
    <div>
      <h3>Format</h3>
      <ReusableTable />
      {/* Add content specific to the Polisa tab here */}
    </div>
  );
};

export default FormatTab;
