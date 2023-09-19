import React from 'react';

const BorrowsTab = ({ labels, activeTab, setActiveTab }) => {
  const handleTabClick = (index, event) => {
    event.preventDefault();
    setActiveTab(index);
  };

  return (
    <div className="border rounded-lg p-1 w-80">
      <div className="flex flex-col space-y-4">
        {labels.map((label, index) => (
          <button
            key={index}
            onClick={(event) => handleTabClick(index, event)}
            className={`${
              index === activeTab
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            } px-4 py-2 rounded-lg focus:outline-none hover:bg-blue-400 transition`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BorrowsTab;
