import React from "react";

const CompaniesTable = ({ companiesObj }) => {
  return companiesObj.map(companyList =>
    companyList.map(company => {
      const { id, name, city } = company;

      return (
        <table>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City</th>
            <th>Total Income</th>
            <th>Average Income</th>
            <th>Last Month Income</th>
          </tr>
          <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{city}</td>
            <td>999</td>
            <td>999</td>
            <td>999</td>
          </tr>
        </table>
      );
    })
  );
};

export default CompaniesTable;
