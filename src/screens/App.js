import "../css/Global.css";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CompaniesTable from "../components/CompaniesTable";
import Pagination from "../components/Pagination";
import axios from "axios";

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [companiesIncome, setCompaniesIncome] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://recruitment.hal.skygate.io/companies"
      );

      const incomesArr = await Promise.all(
        res.data.map(company =>
          axios.get(`https://recruitment.hal.skygate.io/incomes/${company.id}`)
        )
      );
      setCompanies(res.data);
      setCompaniesIncome(incomesArr);

      setLoading(false);
    };

    fetchCompanies();
  }, []);

  // console.log("Companies income ", companiesIncome);
  // console.log("Companies info ", companies);

  const countIncomes = () => {
    const totalIncome = [];
    const totalInc = 0;
    // console.log(companiesIncome);
    companiesIncome.map(
      ({ incomes }) => (
        console.log(companiesIncome),
        incomes.map(i => (totalInc = totalInc + parseInt(i.value))),
        totalIncome.push(totalInc)
      )
    );
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className="app ui container">
      <h1 id="title">COMPANIES DETAILS</h1>

      <SearchBar
        term={searchTerm}
        onTermChange={newTerm => setSearchTerm(newTerm)}
      />
      <CompaniesTable
        companies={companies}
        companiesIncome={companiesIncome}
        loading={loading}
        currentPage={currentPage}
        companiesPerPage={companiesPerPage}
      />
      <Pagination
        companiesPerPage={companiesPerPage}
        totalCompanies={companies.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default App;
