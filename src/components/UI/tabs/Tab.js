import React, { useState } from 'react';

const Tab = ({ labels, children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div>
        {labels.map((label, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={index === activeTab ? 'active' : ''}
          >
            {label}
          </button>
        ))}
      </div>
      <div>{children[activeTab]}</div>
    </div>
  );
};

export default Tab;
