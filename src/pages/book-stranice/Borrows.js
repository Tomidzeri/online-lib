import React, { useState, useEffect } from "react";
import BorrowsTab from "../../components/UI/tabs/BorrowsTab";
import SearchBox from "../../components/UI/search/SearchBox";
import { BsSearch } from "react-icons/bs";
import IzdateKnjigeTable from "./tables/IzdateKnjigeTable";
import VraceneKnjigeTable from "./tables/vraceneKnjigeTable";
import PrekoraceneKnjigeTable from "./tables/PrekoraceneKnjigeTable";
import RezervacijeKnjigaTable from "./tables/RezervisaneKnjigeTable";
import ArhiviraneRezervacijeTable from "./tables/ArhiviraneRezervacijeTable";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

const Borrows = () => {
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
    <div className="mt-16">
      <div className="w-full">
        <div className="flex flex-col">
          <div className="border-b border-gray-300 w-full pb-4 mb-4 ml-4 fixed">
            <div className="ml-20">
              <Typography variant="h4" align="left" padding="3px">
                Izdavanje Knjiga
              </Typography>
            </div>
          </div>
          <div className="flex items-end content-end justify-end space-x-4 mt-20 mb-4">
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
    </div>
  );
};

export default Borrows;
