import React from "react";

const Pagination = ({
  companiesPerPage,
  totalCompanies,
  paginate,
  currentPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCompanies / companiesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul id="horizontal-list">
        {/* <a href="#">&laquo;</a> */}
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a
              className={number === currentPage ? "active" : null}
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
        {/* <a href="#">&raquo;</a> */}
      </ul>
    </nav>
  );
};

export default Pagination;
