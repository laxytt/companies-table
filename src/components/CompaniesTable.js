import "../css/Global.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

const sortTypes = {
  up: {
    class: "sort up",
    fn: key => (a, b) =>
      typeof a === "string" ? a[key].localeCompare(b[key]) : a[key] - b[key]
  },
  down: {
    class: "sort down",
    fn: key => (a, b) =>
      typeof a === "string" ? b[key].localeCompare(a[key]) : b[key] - a[key]
  },
  default: {
    class: "sort",
    fn: (a, b) => a
  }
};

const CompaniesTable = ({
  companies,
  loading,
  currentPage,
  companiesPerPage
}) => {
  const [currentSort, setCurrentSort] = useState("default");
  let sortedCompanies = companies;

  const companiesIncome = [];

  useEffect(() => {}, [currentSort]);

  const onSortChange= key => {
    let nextSort;

    if (currentSort === "default") nextSort = "up";
    else if (currentSort === "up") nextSort = "down";
    else if (currentSort === "down") nextSort = "default";

    setCurrentSort(nextSort);
  };

 

  const fetchIncomes = async id => {
    const res = await axios.get(
      `https://recruitment.hal.skygate.io/incomes/${id}`
    );
    companiesIncome.push(res.data);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }
  sortedCompanies =
    currentSort === "default"
      ? sortedCompanies
      : [...companies].sort(sortTypes[currentSort].fn("id"));
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = sortedCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );
  return (
    <div className="companies-table">
      <h1 id="title">Companies Details</h1>
      <table id="companies">
        <thead>
          <tr>
            <th>
              ID
              <i
                onClick={onSortChange}
                className={`${sortTypes[currentSort].class} icon`}
              />
            </th>

            <th>
              Name
              <i
                onClick={onSortChange}
                className={`${sortTypes[currentSort].class} icon`}
              />
            </th>
            <th>
              City
              <i
                onClick={onSortChange}
                className={`${sortTypes[currentSort].class} icon`}
              />
            </th>
            <th>
              Total Income
              <i
                onClick={onSortChange}
                className={`${sortTypes[currentSort].class} icon`}
              />
            </th>
            <th>
              Average Income
              <i
                onClick={onSortChange}
                className={`${sortTypes[currentSort].class} icon`}
              />
            </th>
            <th>
              Last Month Income
              <i
                onClick={onSortChange}
                className={`${sortTypes[currentSort].class} icon`}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {currentCompanies.map(
            company => (
              fetchIncomes(company.id),
              (
                <tr key={companies.id}>
                  <td>{company.id}</td>
                  <td>{company.name}</td>
                  <td>{company.city}</td>
                  <td>TEST</td>
                  <td>TEST</td>
                  <td>TEST</td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
      <table id="companies"></table>
    </div>
  );
};

export default CompaniesTable;
