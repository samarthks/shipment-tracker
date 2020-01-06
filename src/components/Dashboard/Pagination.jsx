import React from "react";

const Pagination = props => {
  const { previousPage, nextPage, totalPages, currentPage } = props;

  return (
    <div className="d-flex justify-content-between">
      <span className="ml-2">{currentPage}</span>
      of
      <span className="ml-2">{totalPages}</span>

      <ul className="pagination ml-2">
        <li className="page-item">
          <button
            className="page-link"
            onClick={previousPage}
            aria-label="Previous"
          >
            <span aria-hidden="true">«</span>
            <span className="sr-only">Previous</span>
          </button>
        </li>
        <li className="page-item">
          <button className="page-link" onClick={nextPage} aria-label="Next">
            <span aria-hidden="true">»</span>
            <span className="sr-only">Next</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
