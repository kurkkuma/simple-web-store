import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "./App";

import styles from "../styles/Store.module.css";

function Product({
  id,
  image,
  title,
  description,
  price,
  category,
  rate,
  count,
}) {
  const { addToBasket, newProducts, setNewProducts } = useContext(AppContext);
  const { pathname } = useLocation();
  const isOwnProductPage = pathname === "/own-products";

  const validTitle = title.length > 40 ? title.slice(0, 40) : title;

  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const deleteNewProduct = (id) => {
    const newArrProducts = newProducts.filter((product) => product.id !== id);
    setNewProducts([...newArrProducts]);

    localStorage.setItem("newProducts", JSON.stringify(newArrProducts));
  };

  return (
    <div className={styles.card}>
      {isOwnProductPage && (
        <img
          onClick={() => deleteNewProduct(id)}
          className={styles.deleteProduct}
          src="../images/close.png"
          alt="delete"
        />
      )}
      <Link to={`/product/${id}`} onClick={handleToTop}>
        <img src={image} alt={`product ${id}`} className={styles.img} />
      </Link>
      <h5>{validTitle}...</h5>
      <div className={styles.hoverBox}></div>
      <h3>{price}$</h3>
      <div className={styles.info}>
        <p className={styles.category}>Category: {category}</p>
        <p className={styles.raiting}>
          Rating:
          <span> {rate} </span>
          {`(${count} reviews)`}
        </p>
      </div>
      <button
        onClick={() => addToBasket(id)}
        className="btn btn-primary center"
      >
        ADD TO BASKET
      </button>
    </div>
  );
}

export default Product;
