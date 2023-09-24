import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const CustomTab = ({ labels, activeTab, setActiveTab, children }) => {
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
        {labels.map((label, index) => (
          <Tab
            key={index}
            label={label}
          />
        ))}
      </Tabs>
      <div>{children[activeTab]}</div>
    </div>
  );
};

export default CustomTab;
