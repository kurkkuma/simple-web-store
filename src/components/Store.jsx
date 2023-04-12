import React from "react";
import Product from "./Product";
import styles from "../styles/Store.module.css";

function Store({ products, isWarning }) {
  return (
    // РЕНДЕР ТОВАРОВ
    <div className={styles.products}>
      {isWarning ? (
        <p
          className={styles.warning}
        >{`There is no such product in this category :(`}</p>
      ) : (
        products.map((product) => (
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
  );
}

export default Store;
