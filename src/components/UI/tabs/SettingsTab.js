import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const SettingsReusableTab = ({ labels, activeTab, setActiveTab }) => {
  const handleTabChange = (_, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="w-full mt-4">
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {labels.map((label) => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
    </div>
  );
};

export default SettingsReusableTab;
