import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./components/App";
import AddProduct from "./components/AddProduct";
import ProductPage from "./components/ProductPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
