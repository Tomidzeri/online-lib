import React, { useState } from "react";
import BorrowsTab from "../../components/UI/tabs/BorrowsTab";
import SearchBox from "../../components/UI/search/SearchBox";
import { BsSearch } from "react-icons/bs";
import IzdateKnjigeTable from "./tables/IzdateKnjigeTable";
import VraceneKnjigeTable from "./tables/vraceneKnjigeTable";
import PrekoraceneKnjigeTable from "./tables/PrekoraceneKnjigeTable";
import RezervacijeKnjigaTable from "./tables/RezervisaneKnjigeTable";
import ArhiviraneRezervacijeTable from "./tables/ArhiviraneRezervacijeTable";

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
      case 1:
        return <VraceneKnjigeTable searchTerm={searchTerm} />;
      case 2: 
        return <PrekoraceneKnjigeTable searchTerm={searchTerm} />;
      case 3: 
        return <RezervacijeKnjigaTable searchTerm={searchTerm} />;
        case 4: 
        return <ArhiviraneRezervacijeTable searchTerm={searchTerm} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-16 ml-15">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full pb-4 mb-4">
          <h2 className="text-4xl font-bold text-left ml-20">Izdavanje Knjiga</h2>
        </div>
        <div className="flex justify-end space-x-4 mb-4 mt-2 ml-96">
          <BsSearch className="text-gray-600 text-lg text-right" />
          <SearchBox
            onSearch={setSearchTerm}
            className="border border-gray-300 mb-2 px-2 py-2 rounded-md"
          />
        </div>
        <div className="flex">
          <div className="w-2/8 pr-4 ml-20">
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
