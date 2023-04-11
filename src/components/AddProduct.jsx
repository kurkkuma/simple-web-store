import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/Add.module.css";

function AddProduct() {
  const uniqueId = uuidv4();
  const [newProduct, setNewProduct] = useState({
    id: uniqueId,
    title: "",
    price: 0,
    description: "",
    category: "electronics",
    image: "https://folkmart.ua/imgs/b12813.jpg",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  const handleInputChange = (e) => {
    const value =
      e.target.name === "price" ? Number(e.target.value) : e.target.value;

    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = (e) => {
    const existProducts = JSON.parse(localStorage.getItem("newProducts")) || [];
    const allProducts = Array.isArray(existProducts)
      ? [...existProducts, newProduct]
      : [newProduct];
    localStorage.setItem("newProducts", JSON.stringify(allProducts));
  };

  return (
    <div className={styles.wrap}>
      <nav className={styles.nav}>
        <h1>YOUR FAVORITE ONLINE STORE</h1>
        <p className="text-primary">Buy quickly and conveniently</p>
      </nav>

      <div className={styles.add}>
        <h1>Create your own product</h1>
        <form className={styles.form} action="">
          <label htmlFor="title">TITLE</label>
          <input
            onChange={handleInputChange}
            className={styles.title}
            type="text"
            id="title"
            name="title"
          />
          <label htmlFor="description">DESCRIPTION</label>
          <textarea
            onChange={handleInputChange}
            type="text"
            id="description"
            name="description"
          />
          <label htmlFor="category">Category of your product</label>
          <select name="category" onChange={handleInputChange} id="category">
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value={`men's clothing`}>Men's clothing"</option>
            <option value={`women's clothing`}>Women's clothing</option>
            {/* <option value={`all`}>All</option> */}
          </select>
          <label htmlFor="photo">Upload a product photo</label>
          <input
            onChange={handleInputChange}
            type="file"
            id="photo"
            name="image"
          />
          <label htmlFor="price">PRICE $</label>
          <input
            onChange={handleInputChange}
            className={styles.price}
            type="number"
            id="price"
            name="price"
          />
        </form>

        <Link to="/">
          <button
            onClick={handleSubmit}
            className={`btn btn-primary ${styles.btn}`}
          >
            DONE!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AddProduct;
