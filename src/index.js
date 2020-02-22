import React from "react";
import ReactDOM from "react-dom";
import App from "./screens/App";
import { Provider } from "./context/CompaniesContext";

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.querySelector("#root")
);
