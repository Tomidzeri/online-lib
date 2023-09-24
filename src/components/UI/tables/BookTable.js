import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const BookTable = ({ tableHead, tableData }) => {
  return (
    <Table aria-label="collapsible table">
      <TableHead>
        <TableRow>
          {tableHead.map((header) => (
            <TableCell key={header}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((row, index) => (
          <TableRow key={index}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookTable;
