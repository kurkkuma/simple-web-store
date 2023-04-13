import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./App";

import Product from "./Product";
import Basket from "./Basket";

import styles from "../styles/OwnProducts.module.css";

function OwnProducts() {
  const {
    toggleShow,
    newProducts,
    isOpen,
    basket,
    totalPrice,
    deleteFromBasket,
    isWarning,
    setIsWarning,
  } = useContext(AppContext);

  const [showNewProducts, setShowNewProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setShowNewProducts([...newProducts]);
  }, [newProducts]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    filterProducts(selectedOption, e.target.value);
  };
  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
    filterProducts(e.target.value, searchInput);
  };
  const filterProducts = (category, input) => {
    let filtered = newProducts;
    if (category !== "all") {
      filtered = newProducts.filter((product) => product.category === category);
    }
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(input.toLowerCase())
    );
    setShowNewProducts(Array.from(new Set(filtered)));
    if (filtered.length === 0) {
      setIsWarning(true);
    } else {
      setIsWarning(false);
    }
  };

  return (
    <div>
      <nav className={styles.nav}>
        <h1>YOUR FAVORITE ONLINE STORE</h1>
        <p className="text-primary">Buy quickly and conveniently</p>
        <Link to="/">
          <button className={`dropbtn btn btn-dark ${styles.btnHome}`}>
            Home
          </button>
        </Link>
        <button
          onClick={toggleShow}
          className={`dropbtn btn btn-dark ${styles.btnBasket}`}
        >
          <img src="../images/cart.png" alt="" />
        </button>
      </nav>
      <div>
        {isOpen && (
          <Basket
            basket={basket}
            totalPrice={totalPrice}
            deleteFromBasket={deleteFromBasket}
          />
        )}
      </div>
      <div className={isOpen ? styles.halfwrapper : styles.fullwrapper}>
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
        <div className={styles.products}>
          {isWarning ? (
            <p
              className={styles.warning}
            >{`There is no such product in this category :(`}</p>
          ) : (
            showNewProducts.map((product) => (
              <Product
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
                category={product.category}
                rate={product.rating.rate}
                count={product.rating.count}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default OwnProducts;
