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
  const [companiesPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");
  const [joinedData, setJoinedData] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://recruitment.hal.skygate.io/companies"
      );
      setCompanies(res.data);
      let incomesArr = [];
      res.data.map(async company => {
        const res = await axios.get(
          `https://recruitment.hal.skygate.io/incomes/${company.id}`
        );
        incomesArr.push(res.data);
      });
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

  const test = {...companies, ...companiesIncome};
  console.log(test);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  countIncomes();
  return (
    <div className="app ui container">
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
