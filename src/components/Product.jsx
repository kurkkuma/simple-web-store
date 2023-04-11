import React from "react";
import styles from "../styles/Store.module.css";

function Product({
  id,
  image,
  title,
  price,
  category,
  rate,
  count,
  addToBasket,
}) {
  return (
    <div className={styles.card}>
      <img src={image} alt="" />
      {title.length > 50 ? <h5>{title.slice(0, 40)}...</h5> : <h5>{title}</h5>}
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
