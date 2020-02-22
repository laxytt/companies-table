import createDataContext from "./createDataContext";
import companiesApi from "../api/companiesApi";

const companiesReducer = (state, action) => {
  switch (action.type) {
    case "get_companies":
      return [...state, action.payload];
    case "get_income":
      return [...state, action.payload];
    default:
      return state;
  }
};

const getCompanies = dispatch => {
  return async () => {
    await companiesApi
      .get("/companies")
      .then(function(response) {
        dispatch({ type: "get_companies", payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

const getIncome = dispatch => {
  return async id => {
    await companiesApi
      .get(`/incomes/${id}`)
      .then(function(response) {
        dispatch({ type: "get_income", payload: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const { Context, Provider } = createDataContext(
  companiesReducer,
  { getCompanies },
  []
);
