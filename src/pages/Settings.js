import React, { useState, useEffect } from "react";
import CustomTab from "../components/UI/tabs/Tab";
import PolisaTab from "../components/UI/tabs/settings/Polisa";
import KategorijeTab from "../components/UI/tabs/settings/Kategorije";
import ZanroviTab from "../components/UI/tabs/settings/Zanrovi";
import IzdavacTab from "../components/UI/tabs/settings/Izdavac";
import PovezTab from "../components/UI/tabs/settings/Povez";
import FormatTab from "../components/UI/tabs/settings/Format";
import PismoTab from "../components/UI/tabs/settings/Pismo";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

const Settings = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const activeTabParam = queryParams.get("activeTab");
    if (activeTabParam !== null) {
      setActiveTab(parseInt(activeTabParam, 10));
    } else {
      setActiveTab(0); 
    }
  }, [location.search]);

  const tabLabels = [
    "Polisa",
    "Kategorije",
    "Zanrovi",
    "Izdavac",
    "Povez",
    "Format",
    "Pismo",
  ];

  const renderTabByActiveTab = () => {
    switch (activeTab) {
      case 0:
        return <PolisaTab />;
      case 1:
        return <KategorijeTab />;
      case 2:
        return <ZanroviTab />;
      case 3:
        return <IzdavacTab />;
      case 4:
        return <PovezTab />;
      case 5:
        return <FormatTab />;
      case 6:
        return <PismoTab />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-10 flex flex-col">
      <div className="border-b border-gray-300 w-full pb-4 mb-4 ml-4 fixed">
        <div className="ml-20">
          <Typography variant="h3" align="left" paddingTop="1rem">
            Podesavanja
          </Typography>
        </div>
      </div>
      <div>
        <div className="mt-24 flex justify-baseline">
          <CustomTab
            labels={tabLabels}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
        <div className="ml-24 w-2/4">{renderTabByActiveTab()}</div>
      </div>
    </div>
  );
};

export default Settings;
