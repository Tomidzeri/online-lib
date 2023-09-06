import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Pagination.css"; 

function Pagination({ currentPage, itemsPerPage, totalItems, onPageChange }) {
  const totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Rows per page: 5
        <br />
        <span className="page-number">
          {currentPage} of {totalPages}
        </span>
      </div>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FaArrowLeft />
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <FaArrowRight />
      </button>
    </div>
  );
}

export default Pagination;
