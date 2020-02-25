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
    <div className="center">
      <nav className="pagination">
        <ul id="horizontal-list">
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
        </ul>
      </nav>
      </div>
  );
};

export default Pagination;
