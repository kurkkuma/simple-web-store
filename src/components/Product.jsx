import React, { useContext, useState } from "react";
import styles from "../styles/Store.module.css";
import { Link } from "react-router-dom";
import { AppContext } from "./App";

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
  const validTitle = title.length > 40 ? title.slice(0, 40) : title;
  const { addToBasket } = useContext(AppContext);

  const handleToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className={styles.card}>
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
