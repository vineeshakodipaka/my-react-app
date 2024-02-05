import React from "react";
import "./style.css";
import ProList from "./ProList";
import ProDetails from "./ProDetails";

import { Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProList />} />
        <Route path="/details/:proDta" element={<ProDetails />} />
      </Routes>
    </div>
  );
}
