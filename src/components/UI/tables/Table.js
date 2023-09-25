import React from "react";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import PropTypes from "prop-types";

function ReusableTable({ tableHead, tableData }) {
  return (
    <Card variant="outlined" style={{ overflow: "visible" }}>
      <div>
      <Table>
        <TableHead>
          <TableRow>
            {tableHead.map((head) => (
              <TableCell key={head} className="bg-gray-200">
                <div className="font-small leading-none opacity-70">{head}</div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((rowData, index) => {
            const isLast = index === tableData.length - 1;
            const classes = isLast ? "p-2 sm:p-2" : "p-2 sm:p-3";

            return (
              <TableRow key={index}>
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
      </div>
    </Card>
  );
}

ReusableTable.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default ReusableTable;
