import React, { useState } from "react";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
} from "@mui/material";
import PropTypes from "prop-types";

function SettTable({ tableHead, tableData }) {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedData = [...tableData].sort((a, b) => {
    if (sortBy === null) return 0;

    const cellA = a[sortBy];
    const cellB = b[sortBy];

    if (typeof cellA === "string" && typeof cellB === "string") {
      if (sortOrder === "asc") {
        return cellA.localeCompare(cellB);
      } else {
        return cellB.localeCompare(cellA);
      }
    } else if (typeof cellA === "number" && typeof cellB === "number") {
      return sortOrder === "asc" ? cellA - cellB : cellB - cellA;
    } else {
      return 0;
    }
  });

  return (
    <Card
      variant="outlined"
      style={{
        overflow: "visible",
        boxShadow: "8px 8px 12px rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        maxWidth: "94%",
      }}
    >
      <Table style={{ flex: 1 }}>
        <TableHead>
          <TableRow>
            {tableHead.map((head, index) => (
              <TableCell key={index} className="bg-gray-200">
                {head.includes("Ime") ||
                head.includes("Naziv") ||
                head.includes("Autor") ||
                head.includes("Email") ? (
                  <TableSortLabel
                    active={sortBy === index}
                    direction={sortOrder}
                    onClick={() => handleSort(index)}
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    <div className="font-small leading-none opacity-70">
                      {head}
                    </div>
                  </TableSortLabel>
                ) : (
                  <div className="font-small leading-none opacity-70">
                    {head}
                  </div>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((rowData, rowIndex) => {
            const isLast = rowIndex === sortedData.length - 1;
            const classes = isLast ? "p-2 sm:p-2" : "p-2 sm:p-3";

            return (
              <TableRow key={rowIndex}>
                {rowData.map((cellData, cellIndex) => {
                  if (React.isValidElement(cellData)) {
                    return (
                      <TableCell key={cellIndex} className={classes}>
                        {cellData}
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell
                      key={cellIndex}
                      className={`${
                        cellIndex % 2 === 0
                          ? classes
                          : `${classes} bg-blue-gray-100/50`
                      }`}
                    >
                      <div className="font-normal">{cellData}</div>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}

SettTable.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default SettTable;
