import React from "react";
import ReactDOM from "react-dom/client";
import AddProduct from "./components/AddProduct";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import App from "./components/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<AddProduct />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
