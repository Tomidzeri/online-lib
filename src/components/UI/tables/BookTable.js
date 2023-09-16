import React from 'react';

const BookTable = ({ tableHead, tableData }) => {
  return (
    <table className="border-collapse w-full">
      <thead>
        <tr>
          {tableHead.map((header) => (
            <th key={header} className="border border-gray-400 px-4 py-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border border-gray-400 px-4 py-2">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
