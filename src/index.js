import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

//on load function
function Index() {
  /* checks whether there is any session storage item named 'websiteOn' or not, if yes then it would set the
  latest values of the user */
  if (
    sessionStorage.getItem("websiteOn") !== "No" &&
    sessionStorage.getItem("websiteOn") !== null
  ) {
    sessionStorage.setItem("websiteOn", "Yes");
    sessionStorage.setItem("id", sessionStorage.getItem("id"));
    sessionStorage.setItem("isLoggedIn", sessionStorage.getItem("isLoggedIn"));
  }
  //else if would set the initial values
  else {
    sessionStorage.setItem("websiteOn", "Yes");
    sessionStorage.setItem("id", "");
    sessionStorage.setItem("isLoggedIn", "false");
  }
  return null;
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
