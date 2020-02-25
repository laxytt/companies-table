import "../css/Global.css";
import React, { useState, useEffect } from "react";
import _ from "lodash";

const CompaniesTable = ({
  companies,
  companiesIncome,
  loading,
  currentPage,
  companiesPerPage
}) => {
  const [currentSort, setCurrentSort] = useState("default");

  let companyData = _.merge(companies, companiesIncome);

  if (loading) {
    return (
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

  let currentCompanies = companyData.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  const onSort = sortKey => {
    let data;
    let nextSort;

    if (currentSort === "default") {
      data = companyData.sort((a, b) =>
        typeof a[sortKey] === "string"
          ? a[sortKey].localeCompare(b[sortKey])
          : a[sortKey] - b[sortKey]
      );
      nextSort = "down";
    }
    if (currentSort === "down") {
      data = companyData.sort((a, b) =>
        typeof a[sortKey] === "string"
          ? b[sortKey].localeCompare(a[sortKey])
          : b[sortKey] - a[sortKey]
      );
      nextSort = "up";
    }
    if (currentSort === "up") {
      data = companyData.sort((a, b) =>
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

  const calcTotalInc = data => {
    let totalInc = 0;
    let incomeArr = [data];
    incomeArr.map(({ incomes, id }) =>
      incomes.map(i => (totalInc = totalInc + parseInt(i.value)))
    );

    return totalInc;
  };

  const calcAverageInc = data => {
    let averageInc = 0;
    let c = 0;
    let test = [];
    let incomeArr = [data];
    incomeArr.map(({ incomes, id }) =>
      incomes.map(i => (c++, (averageInc += parseInt(i.value) / c)))
    );

    return Math.round(averageInc);
  };

  const calcLastMonth = data => {
    let averageInc = 0;
    let c = 0;
    let incomeArr = [data];
    incomeArr.map(({ incomes, id }) =>
      incomes.map(i => (c++, (averageInc += parseInt(i.value) / c)))
    );

    return Math.round(averageInc);
  };

  const companyRows = () => {
    let lastMonthInc = 0;
    return currentCompanies.map(({ data, id, name, city }) => (
      <tr key={id}>
        <td>
          <b>{id}</b>
        </td>
        <td>
          <b>{name}</b>
        </td>
        <td>
          <b>{city}</b>
        </td>
        <td>
          <b>{calcTotalInc(data)}</b>
          <i class="dollar sign icon"></i>
        </td>
        <td>
          <b>{calcAverageInc(data)}</b>
          <i class="dollar sign icon"></i>
        </td>
        <td>
          <b>{lastMonthInc}</b>
          <i class="dollar sign icon"></i>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="companies-table">
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
