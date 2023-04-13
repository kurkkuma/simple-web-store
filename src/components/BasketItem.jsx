import React from "react";
import styles from "../styles/Basket.module.css";

function BasketItem({ id, image, title, price, deleteFromBasket }) {
  const showTitle = title.length > 25 ? title.slice(0, 25) : title;
  return (
    <div className={styles.card}>
      <img
        className={styles.close}
        onClick={() => deleteFromBasket(id)}
        src="../images/close.png"
        alt=""
      />
      <img className={styles.photo} src={image} alt="" />
      <h6>{showTitle}...</h6>
      <p>{price}$</p>
    </div>
  );
}

export default BasketItem;
