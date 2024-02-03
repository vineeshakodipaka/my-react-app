import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
const root = createRoot(document.getElementById("app"));

root.render(
  <Router>
    <App />
  </Router>
);
