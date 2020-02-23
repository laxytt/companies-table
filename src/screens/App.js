import "../css/Global.css";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CompaniesTable from "../components/CompaniesTable";
import Pagination from "../components/Pagination";
import axios from "axios";

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(25);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      const res = await axios.get(
        "https://recruitment.hal.skygate.io/companies"
      );
      setCompanies(res.data);
      setLoading(false);
    };

    fetchCompanies();
  }, []);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="app ui container">
      <SearchBar />
      <CompaniesTable
        companies={companies}
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
