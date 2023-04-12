import React from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/ProductPage.module.css";

function ProductPage() {
  const { id } = useParams();
  const products = JSON.parse(localStorage.getItem("products"));
  const selectedProduct = products.find((product) => product.id === id);

  if (!selectedProduct) {
    return <div>Loading...</div>;
  }

  console.log(selectedProduct);
  return (
    <div>
      <nav className={styles.nav}>
        <h1>YOUR FAVORITE ONLINE STORE</h1>
        <p className="text-primary">Buy quickly and conveniently</p>
      </nav>
      <div className={styles.wrapper}>
        <h1>{selectedProduct.title}</h1>
        <p>{selectedProduct.category}</p>
        <div className={styles.productContainer}>
          <img
            src={selectedProduct.image}
            alt={`photo ${selectedProduct.title}`}
          />

          <div className={styles.productInfo}>
            <h3>Price: {selectedProduct.price}$</h3>
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
      </div>
    </div>
  );
}

export default ProductPage;
