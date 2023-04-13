import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/OwnProducts.module.css";
import { AppContext } from "./App";
import Product from "./Product";
import Basket from "./Basket";

function OwnProducts() {
  const {
    toggleShow,
    newProducts,
    isOpen,
    basket,
    totalPrice,
    deleteFromBasket,
  } = useContext(AppContext);

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
        <div className={styles.products}>
          {newProducts.map((product) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default OwnProducts;
