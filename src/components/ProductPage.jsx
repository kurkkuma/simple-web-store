import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "./App";
import Product from "./Product";
import Basket from "./Basket";

import styles from "../styles/ProductPage.module.css";

function ProductPage() {
  const { id } = useParams();
  const {
    products,
    toggleShow,
    isOpen,
    basket,
    totalPrice,
    deleteFromBasket,
    addToBasket,
  } = useContext(AppContext);

  const selectedProduct = products.find((product) => product.id === id);

  const productsInThisCategory = products.filter(
    (product) => product.category === selectedProduct.category
  );

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
        <h1>{selectedProduct.title}</h1>
        <p>{selectedProduct.category}</p>
        <div className={styles.productContainer}>
          <img
            src={selectedProduct.image}
            alt={`photo ${selectedProduct.title}`}
          />
          <div className={styles.productInfo}>
            <div className={styles.priceAndBtn}>
              <h3 className={styles.price}>Price: {selectedProduct.price}$</h3>
              <button
                onClick={() => addToBasket(selectedProduct.id)}
                className={`btn btn-primary ${styles.btnToBasket}`}
              >
                ADD TO BASKET
              </button>
            </div>
            <h5>
              Rate: {selectedProduct.rating.rate}{" "}
              {`(${selectedProduct.rating.count} reviews)`}
            </h5>
            <p>
              <span>Description:</span> {selectedProduct.description}
            </p>
          </div>
        </div>
        <h3 className={styles.recommendText}>Products from this category</h3>
        <div className={styles.recommendProduct}>
          {productsInThisCategory.map((product) => (
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

export default ProductPage;
