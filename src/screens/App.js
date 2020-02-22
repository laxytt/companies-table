import React, { useEffect, useContext } from "react";
import SearchBar from "../components/SearchBar";
import { Context } from "../context/CompaniesContext";
import CompaniesTable from "../components/CompaniesTable";

const App = () => {
  const { getCompanies, state } = useContext(Context);

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="ui container">
      <SearchBar />
      <CompaniesTable companies={state} />
    </div>
  );
};

export default App;
