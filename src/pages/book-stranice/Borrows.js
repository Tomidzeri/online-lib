import React, { useState } from "react";
import BorrowsTab from "../../components/UI/tabs/BorrowsTab";
import SearchBox from "../../components/UI/search/SearchBox";
import { BsSearch } from "react-icons/bs";
import IzdateKnjigeTable from "./tables/IzdateKnjigeTable";

const Borrows = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const tabLabels = [
    "Izdate knjige",
    "Vracene knjige",
    "Knjige u prekoracenju",
    "Aktivne rezervacije",
    "Arhivirane rezervacije",
  ];

  const renderTableByActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <IzdateKnjigeTable searchTerm={searchTerm} />; 
      default:
        return null;
    }
  };

  return (
    <div className="main-content mt-24 ml-20">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full pb-2 mb-2">
          <h2 className="text-2xl font-bold text-center">Izdavanje Knjiga</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center ml-80 space-x-4 mb-4 mt-2">
            <BsSearch className="text-gray-600 text-lg" />
            <SearchBox
              onSearch={setSearchTerm}
              className="border border-gray-300 mb-2 px-2 py-2 rounded-md"
            />
          </div>
        </div>
        <div className="flex">
          <div className="w-2/8 pr-4">
            <BorrowsTab
              labels={tabLabels}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="w-full">{renderTableByActiveTab()}</div>
        </div>
      </div>
    </div>
  );
};

export default Borrows;
