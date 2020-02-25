import "../css/Global.css";
import React, { useState, useEffect } from "react";

const CompaniesTable = ({
  companies,
  companiesIncome,
  loading,
  currentPage,
  companiesPerPage
}) => {
  const [currentSort, setCurrentSort] = useState("default");
  let sortedCompanies = companies;
  let totalIncArr = [];

  const countTotalIncome = () => {
    // console.log("działa");
    // console.log(companiesIncome);
    let totalInc = 0;
    companiesIncome.map(
      ({ incomes }) => (
        console.log(companiesIncome),
        incomes.map(i => (totalInc = totalInc + parseInt(i.value))),
        totalIncArr.push(totalInc)
      )
    );
  };

  if (companiesIncome.length >= 1) {
    countTotalIncome();
  }

  if (loading) {
    return (
      // <div class="ui segment">
      <div>
        <div class="ui active inverted dimmer">
          <div class="ui text loader">Loading</div>
        </div>
        <p></p>
      </div>
    );
  }

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;

  let currentCompanies = sortedCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  const onSort = sortKey => {
    let data = companies;
    let nextSort;

    if (currentSort === "default") {
      data = companies.sort((a, b) =>
        typeof a[sortKey] === "string"
          ? a[sortKey].localeCompare(b[sortKey])
          : a[sortKey] - b[sortKey]
      );
      nextSort = "down";
    }
    if (currentSort === "down") {
      data = companies.sort((a, b) =>
        typeof a[sortKey] === "string"
          ? b[sortKey].localeCompare(a[sortKey])
          : b[sortKey] - a[sortKey]
      );
      nextSort = "up";
    }
    if (currentSort === "up") {
      data = companies.sort((a, b) =>
        typeof a[sortKey] === "string"
          ? a[sortKey].localeCompare(b[sortKey])
          : a[sortKey] - b[sortKey]
      );
      nextSort = "down";
    }
    setCurrentSort(nextSort);
  };

  const fieldOrder = [
    { id: "id", text: "ID" },
    { id: "name", text: "Name" },
    { id: "city", text: "City" },
    { id: "total_income", text: "Total Income" },
    { id: "average_income", text: "Average Income" },
    { id: "last_month_income", text: "Last Month Income" }
  ];
  const companyRows = () => {
    return currentCompanies.map(company => (
      <tr key={company.id}>
        <td>{company.id}</td>
        <td>{company.name}</td>
        <td>{company.city}</td>
        <td>TEST</td>
        <td>TEST</td>
        <td>TEST</td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="companies-table">
        <h1 id="title">Companies Details</h1>
        <table id="companies">
          <thead>
            <tr>
              {fieldOrder.map(field => {
                return (
                  <th key={field.id}>
                    {field.text}
                    <i
                      key={field.id}
                      onClick={() => onSort(field.id)}
                      className={`sort icon`}
                    />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>{companyRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default CompaniesTable;
