import React from "react";
import "./style.css";
import StdList from "./StdList";
import StdCreate from "./StdCreate";
import StdDetails from "./StdDetails";
import StdEdit from "./StdEdit";

import { Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StdList />} />
        <Route path="/create" element={<StdCreate />} />
        <Route path="/details/:stdDta" element={<StdDetails />} />
        <Route path="/edit/:stdDta" element={<StdEdit />} />
      </Routes>
    </div>
  );
}
