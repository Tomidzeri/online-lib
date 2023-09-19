import { Card } from "@material-tailwind/react";
import PropTypes from "prop-types";
import React from "react";

function BorrowsTable({ tableHead, tableData }) {
  return (
    <Card className="w-full rounded-lg shadow-lg block">
      <div className="overflow-none">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-200" style={{ height: "50px" }}> {/* Set a fixed height here */}
            <tr>
              {tableHead.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 p-2 sm:p-1 sticky top-0 z-10 shadow-md text-sm text-black"
                >
                  <div className="font-normal leading-none opacity-70 pr-32 pl-2">
                    {head}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((rowData, index) => {
              const isLast = index === tableData.length - 1;
              const classes = isLast
                ? "p-2 sm:p-2"
                : "p-2 sm:p-3 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  {rowData.map((cellData, cellIndex) => {
                    if (React.isValidElement(cellData)) {
                      return (
                        <td key={cellIndex} className={classes}>
                          {cellData}
                        </td>
                      );
                    }

                    return (
                      <td
                        key={cellIndex}
                        className={`${
                          cellIndex % 2 === 0
                            ? classes
                            : `${classes} bg-blue-gray-100/50`
                        }`}
                      >
                        <div className="font-small leading-none">
                          {cellData}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

BorrowsTable.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default BorrowsTable;
