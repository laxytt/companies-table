import "../css/Global.css";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CompaniesTable from "../components/CompaniesTable";
import Pagination from "../components/Pagination";
import axios from "axios";
import _ from "lodash";

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalIncomeArr, setTotalIncomeArr] = useState([]);
  const [averageIncomeArr, setAverageIncomeArr] = useState([]);

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
      const mappedResponse = incomesArr.map(income => income.data);
      let totalIncomeArr = [];
      let averageIncomeArr = [];
      const totalIncome = () => {
        let totalInc = 0;
        mappedResponse.map(({ incomes, id }) => {
          incomes.map(
            ({ value, id }) => (totalInc = totalInc + parseInt(value))
          );
          totalIncomeArr.push({ totalInc, id });
          totalInc = 0;
        });
      };
      const averageIncome = () => {
        let averageInc = 0;
        let c = 0;
        let totalInc = 0;
        mappedResponse.map(({ incomes, id }) => {
          incomes.map(
            ({ value, id }) => (
              c++, (averageInc = (totalInc += parseInt(value)) / c)
            )
          );
          averageIncomeArr.push({ averageInc, id });
          averageInc = 0;
          totalInc = 0;
          c = 0;
        });
      };

    //  const  lastMonthincome = () => {
    //     let mostRecentDate = new Date(
    //       Math.max.apply(
    //         null,
    //         mappedResponse.map(({ incomes }) => {
    //           incomes.map(({ date }) => {
    //             console.log(date)
    //             return new Date(date.MeasureDate);
    //           });
    //         })
    //       )
    //     );
    //     let mostRecentObject = mappedResponse.filter(e => {
    //       let d = new Date(e.MeasureDate);
    //       return d.getTime() == mostRecentDate.getTime();
    //     })[0];
    //     console.log(mostRecentDate);
    //     console.log(mostRecentObject);
    //   };

      lastMonthincome()
      setCompanies(res.data);
      setTotalIncomeArr(totalIncomeArr);
      setAverageIncomeArr(averageIncomeArr);
      totalIncome();
      averageIncome();
      setLoading(false);
      // const IncomeDataFull = _.merge(totalIncomeArr, averageIncomeArr)
    };

    fetchCompanies();
  }, []);

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
        loading={loading}
        currentPage={currentPage}
        companiesPerPage={companiesPerPage}
        totalIncomeArr={totalIncomeArr}
        averageIncomeArr={averageIncomeArr}
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
