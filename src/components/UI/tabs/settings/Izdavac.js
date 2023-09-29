// PolisaTab.js
import React from "react";
import ReusableTable from "../../tables/BorrowsTable";

const IzdavacTab = () => {
  return (
    <div>
      <h3>Izdavac</h3>
      <ReusableTable />
      {/* Add content specific to the Polisa tab here */}
    </div>
  );
};

export default IzdavacTab;
