import "../css/Global.css";
import React, { useState } from "react";
import _ from "lodash";

const CompaniesTable = ({
  companies,
  loading,
  currentPage,
  companiesPerPage,
  totalIncomeArr,
  averageIncomeArr
}) => {
  const [currentSort, setCurrentSort] = useState("default");

  const  companyData = _.merge(companies, totalIncomeArr, averageIncomeArr);
  if (loading) {
    return (
      <div>
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
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
    let data = companyData;
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
          : parseInt(b[sortKey]) - parseInt(a[sortKey])
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

  const companyRows = () => {
    return currentCompanies.map(({ totalInc, averageInc, id, name, city }) => (
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
          <b>{totalInc}</b>
          <i className="dollar sign icon"></i>
        </td>
        <td>
          <b>{averageInc}</b>
          <i className="dollar sign icon"></i>
        </td>
        <td>
          <b>0</b>
          <i className="dollar sign icon"></i>
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
