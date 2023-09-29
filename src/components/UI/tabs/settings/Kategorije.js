// PolisaTab.js
import React from "react";
import ReusableTable from "../../tables/BorrowsTable";

const KategorijeTab = () => {
  return (
    <div>
      <h3>Kategorije</h3>
      <ReusableTable />
      {/* Add content specific to the Polisa tab here */}
    </div>
  );
};

export default KategorijeTab;
