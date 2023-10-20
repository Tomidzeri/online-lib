import React, { useState, useEffect } from "react";
import BorrowsTab from "../../../tabs/BorrowsTab";
import SearchBox from "../../../search/SearchBox";
import { BsSearch } from "react-icons/bs";
import IzdateStudent from "../../userActions/studentPage/studentTables/IzdateStudent";
import VraceneStudent from "../../userActions/studentPage/studentTables/VraceneStudent";
import PrekoraceneStudent from "../../userActions/studentPage/studentTables/PrekoraceneStudent";
import RezervacijeStudent from "../../userActions/studentPage/studentTables/RezervisaneStudent";
import ArhiviraneStudent from "../../userActions/studentPage/studentTables/ArhiviraneStudent";
import { useLocation } from "react-router-dom";

const StudentBorrows = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const tabLabels = [
    "Izdate knjige",
    "Vracene knjige",
    "Knjige u prekoracenju",
    "Aktivne rezervacije",
    "Arhivirane rezervacije",
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const activeTabParam = queryParams.get("activeTab");
    if (activeTabParam !== null) {
      setActiveTab(parseInt(activeTabParam, 10));
    }
  }, [location.search]);

  const renderTableByActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <IzdateStudent searchTerm={searchTerm} />;
      case 1:
        return <VraceneStudent searchTerm={searchTerm} />;
      case 2:
        return <PrekoraceneStudent searchTerm={searchTerm} />;
      case 3:
        return <RezervacijeStudent searchTerm={searchTerm} />;
      case 4:
        return <ArhiviraneStudent searchTerm={searchTerm} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="w-full">
        <div className="flex items-end content-end justify-end space-x-4 mt-3 mb-4">
          <BsSearch className="text-gray-600 text-lg text-right" />
          <SearchBox
            onSearch={setSearchTerm}
            className="border border-gray-300 mb-2 px-2 py-2 rounded-md"
          />
        </div>
        <div className="flex">
          <div className="w-2/8 pr-4 ml-4">
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

export default StudentBorrows;
