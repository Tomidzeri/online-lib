import React from "react";

const SettTable = ({ tableHeader, dataTable }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          {tableHeader.map((header, index) => (
            <th
              key={index}
              className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataTable.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SettTable;
