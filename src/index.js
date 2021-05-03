import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Routes from "../src/Routes/Routes";
import "./index.css";
import "antd/dist/antd.css";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import Header from "../src/components/Header/Header";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
   <React.StrictMode>
      <Router>
         {/* <App /> */}
         <Header />
         <Routes></Routes>
      </Router>
   </React.StrictMode>,
   document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
