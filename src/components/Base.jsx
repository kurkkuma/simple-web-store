import React, { useContext } from "react";
// import { useEffect, useState, createContext, useContext } from "react";
// import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import Basket from "./Basket";
import Store from "./Store";
import styles from "../styles/Main.module.css";
import { AppContext } from "./App";

function Base() {
  const {
    toggleShow,
    isOpen,
    searchInput,
    handleSearch,
    handleSelect,
    selectedOption,
    isWarning,
    showProducts,
    products,
    basket,
    totalPrice,
    deleteFromBasket,
  } = useContext(AppContext);

  return (
    <div className="Base">
      {/* НАВИГАЦИЯ */}
      <nav className={styles.nav}>
        <h1>YOUR FAVORITE ONLINE STORE</h1>
        <p className="text-primary">Buy quickly and conveniently</p>

        <Link to="/add">
          <button className={`dropbtn btn btn-dark ${styles.btnAdd}`}>
            Add product
          </button>
        </Link>

        <button
          onClick={toggleShow}
          className={`dropbtn btn btn-dark ${styles.btnBasket}`}
        >
          <img src="./images/cart.png" alt="" />
        </button>
      </nav>
      {/* ОСНОВНАЯ ИНФОРМАЦИЯ */}
      {/* КОРЗИНА */}
      <div>
        {isOpen && (
          <Basket
            basket={basket}
            totalPrice={totalPrice}
            deleteFromBasket={deleteFromBasket}
          />
        )}
      </div>
      {/* МАГАЗИН И ТОВАРЫ */}
      <div>
        <div className={isOpen ? styles.halfstore : styles.fullstore}>
          {/* ПОИСК И ФИЛЬТР */}
          <div className={isOpen ? styles.halffunc : styles.fullfunc}>
            {/* ПОИСК */}
            <div className={styles.search}>
              <label htmlFor="search">Search:</label>
              <input
                value={searchInput}
                onChange={handleSearch}
                type="text"
                id="search"
                autoComplete="off"
              />
              <button className="btn">
                <img src="./images/search.png" alt="" />
              </button>
            </div>
            {/* ФИЛТР */}
            <div className={styles.filter}>
              <label htmlFor="filter">Filter by category:</label>
              <select
                onChange={handleSelect}
                value={selectedOption}
                className="form-select"
                id="filter"
              >
                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value={`men's clothing`}>Men's clothing</option>
                <option value={`women's clothing`}>Women's clothing</option>
                <option value={`food`}>Food</option>
                <option value={`sport`}>Sport</option>
                <option value={`childen's goods`}>Childen's goods</option>
                <option value={`a house and a garden`}>
                  A house and a garden
                </option>
                <option value={`stationery`}>Stationery</option>
                <option value={`furniture and interior`}>
                  Furniture and interior
                </option>
                <option value={`auto products`}>Auto products</option>
                <option value={`pets`}>Pets</option>
                <option value={`other`}>Other</option>
              </select>
            </div>
          </div>
          {/* ТОВАРЫ */}
          <Store
            isWarning={isWarning}
            products={showProducts.length > 0 ? showProducts : products}
          />
        </div>
      </div>
    </div>
  );
}

export default Base;
