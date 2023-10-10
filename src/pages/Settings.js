import React, { useState } from "react";
import Tab from "../components/UI/tabs/Tab";
import PolisaTab from "../components/UI/tabs/settings/Polisa";
import KategorijeTab from "../components/UI/tabs/settings/Kategorije";
import ZanroviTab from "../components/UI/tabs/settings/Zanrovi";
import IzdavacTab from "../components/UI/tabs/settings/Izdavac";
import PovezTab from "../components/UI/tabs/settings/Povez";
import FormatTab from "../components/UI/tabs/settings/Format";
import PismoTab from "../components/UI/tabs/settings/Pismo";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-16 flex flex-col">
      <div className="border-b border-gray-300 w-full pb-6 mb-4 text-center fixed">
        <h2 className="text-4xl">Podesavanja</h2>
      </div>
      <div className="mt-14">
        <Tab
          labels={[
            "Polisa",
            "Kategorije",
            "Zanrovi",
            "Izdavac",
            "Povez",
            "Format",
            "Pismo",
          ]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          {(activeTab) => {
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
          }}
        </Tab>
      </div>
    </div>
  );
};

export default Settings;
