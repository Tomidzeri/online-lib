import { Card, Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

function ReusableTable({ tableHead, tableData }) {
  return (
    <Card className="w-full rounded-lg shadow-lg block">
      <div className="overflow-none">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 sm:p-1"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
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
                  {rowData.map((cellData, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={
                        cellIndex % 2 === 0
                          ? classes
                          : `${classes} bg-blue-gray-50/50`
                      }
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {cellData}
                      </Typography>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

ReusableTable.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default ReusableTable;
