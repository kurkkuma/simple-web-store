import React from "react";
import BasketItem from "./BasketItem";
import styles from "../styles/Basket.module.css";

function Basket({ basket, totalPrice, deleteFromBasket }) {
  return (
    <div className={styles.basket}>
      {/* ИНФОРМАЦИЯ КОРЗИНЫ */}
      <div className={styles.info}>
        <h3>Basket:</h3>
        <p>Count items: {basket.length} </p>
        <p>
          Total price: <span>{Number(totalPrice.toFixed(2))}$</span>
        </p>
        <button className="btn btn-secondary">BUY NOW</button>
      </div>
      {/* ТОВАРЫ В КОРЗИНЕ */}
      <div className={styles.basket_items}>
        {basket.map((item, index) => (
          <BasketItem
            id={item.id}
            key={index}
            image={item.image}
            title={item.title}
            price={item.price}
            deleteFromBasket={deleteFromBasket}
          />
        ))}
      </div>
    </div>
  );
}

export default Basket;
