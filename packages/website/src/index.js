import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import { ThemeProvider } from "styled-components";
import "./index.css";
import App from "./App";

if (process.env.NODE_ENV === "production") {
  ReactGA.initialize("UA-108352892-1");
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const theme = {
  mainMargin: {
    desktop: "200px",
    tablet: "50px",
    phone: "10px"
  }
};
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
