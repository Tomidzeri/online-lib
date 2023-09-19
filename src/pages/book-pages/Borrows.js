import React, { useState } from "react";
import BorrowsTab from "../../components/UI/tabs/BorrowsTab";
import BorrowsTable from "../../components/UI/tables/BorrowsTable";
import SearchBox from "../../components/UI/search/SearchBox";
import { BsSearch } from "react-icons/bs";
import BorrowsActionsDropdown from "../../components/UI/BorrowsActionsDropdown";

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

  const tableHeaders = [
    // Izdate knjige
    [
      "Naziv knjige",
      "Izdato uceniku",
      "Datum izdavanja",
      "Trenutno zadrzavanje knjige",
      "Knjigu izdao",
      "",
      "Actions",
    ],
    // Vracene knjige
    [
      "Naziv knjige",
      "Izdato uceniku",
      "Datum izdavanja",
      "Datum vracanja",
      "Zadrzavanje knjige",
      "Knjigu primio",
      "Actions",
    ],
    // Knjige u prekoracenju
    [
      "Naziv knjige",
      "Datum izdavanja",
      "Izdato uceniku",
      "Prekoracenje u danima",
      "Trenutno zadrzavanje knjige",
      "",
      "Actions",
    ],
    // Aktivne rezervacije
    [
      "Naziv knjige",
      "Datum rezervacije",
      "Rezervacija istice",
      "Rezervaciju podnio",
      "Status",
      "",
      "Actions",
    ],
    // Arhivirane rezervacije
    [
      "Naziv knjige",
      "Datum rezervacije",
      "Rezervacija istice",
      "Rezervaciju podnio",
      "Status",
      "",
      "Actions",
    ],
  ];

  const dummyData = [
    // Izdate knjige
    [
      "Book 1",
      "John Doe",
      "2023-09-15",
      "3 days",
      "Library A",
      "",
      <BorrowsActionsDropdown />,
    ],
    [
      "Book 2",
      "Jane Smith",
      "2023-09-14",
      "2 days",
      "Library B",
      "",
      <BorrowsActionsDropdown />,
    ],
    [
      "Book 3",
      "Bob Johnson",
      "2023-09-13",
      "1 day",
      "Library C",
      "",
      <BorrowsActionsDropdown />,
    ],
    // ... Add data for other tabs as well with corresponding components
  ];

  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const filteredData = dummyData.filter((dataRow) =>
    dataRow.some((cell) =>
      cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="main-content z-10 mt-24 ml-20">
      <div className="w-full">
        <div className="border-b border-gray-300 w-full pb-2 mb-2">
          <h2 className="text-2xl font-bold text-center">Izdavanje Knjiga</h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center ml-80 space-x-4 mb-4 mt-2">
            <BsSearch className="text-gray-600 text-lg" />
            <SearchBox
              onSearch={handleSearchTermChange} 
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
          <div className="w-6/8">
            <BorrowsTable
              tableHead={tableHeaders[activeTab]}
              tableData={filteredData}
              className="mt-4 pr-20" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Borrows;
