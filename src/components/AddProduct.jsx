import React, { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styles from "../styles/Add.module.css";

function AddProduct() {
  const uniqueId = uuidv4();
  const [isValid, setIsValid] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: uniqueId,
    title: "",
    price: 0,
    description: "",
    category: "other",
    image: "",
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
  const handleValid = () => {
    if (
      newProduct.title.trim() !== "" &&
      newProduct.description.trim() !== "" &&
      newProduct.image.trim() !== "" &&
      newProduct.price !== 0
    ) {
      setIsValid(true);
    }
  };
  const handleSubmit = (e) => {
    const existProducts = JSON.parse(localStorage.getItem("newProducts")) || [];
    const allProducts = Array.isArray(existProducts)
      ? [...existProducts, newProduct]
      : [newProduct];
    localStorage.setItem("newProducts", JSON.stringify(allProducts));
    window.location.href = "/";
  };

  return (
    <div className={styles.wrap}>
      <nav className={styles.nav}>
        <h1>YOUR FAVORITE ONLINE STORE</h1>
        <p className="text-primary">Buy quickly and conveniently</p>
      </nav>

      <div className={styles.add}>
        <Link to="/">
          <img
            className={styles.close}
            src="./images/close.png"
            alt="close_icon"
          />
        </Link>
        <h1>Create your own product</h1>
        <form className={styles.form} action="">
          <label htmlFor="title">TITLE</label>
          <input
            onChange={handleInputChange}
            className={styles.title}
            type="text"
            id="title"
            name="title"
            disabled={isValid}
            maxLength="150"
          />
          <label htmlFor="description">DESCRIPTION</label>
          <textarea
            onChange={handleInputChange}
            type="text"
            id="description"
            name="description"
            disabled={isValid}
            maxLength="820"
          />
          <label htmlFor="category">Category of your product</label>
          <select
            name="category"
            onChange={handleInputChange}
            id="category"
            disabled={isValid}
          >
            <option value={`other`}>Other</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value={`men's clothing`}>Men's clothing"</option>
            <option value={`women's clothing`}>Women's clothing</option>
            <option value={`food`}>Food</option>
            <option value={`sport`}>Sport</option>
            <option value={`childen's goods`}>Childen's goods</option>
            <option value={`a house and a garden`}>A house and a garden</option>
            <option value={`stationery`}>Stationery</option>
            <option value={`furniture and interior`}>
              Furniture and interior
            </option>
            <option value={`auto products`}>Auto products</option>
            <option value={`pets`}>Pets</option>

            {/* <option value={`all`}>All</option> */}
          </select>
          <label htmlFor="image">Image URL</label>
          <input
            onChange={handleInputChange}
            className={styles.image}
            type="text"
            id="image"
            name="image"
            autoComplete="off"
            disabled={isValid}
          />
          <label htmlFor="price">PRICE $</label>
          <input
            onChange={handleInputChange}
            className={styles.price}
            type="number"
            id="price"
            name="price"
            disabled={isValid}
          />
        </form>

        {isValid ? (
          <div className={styles.check}>
            <p className={styles.success}>
              {`Thank you, the product data has been saved! :)`}{" "}
            </p>
            <Link to="/">
              <button
                onClick={handleSubmit}
                className={`btn btn-primary ${styles.btn}`}
              >
                DONE!
              </button>
            </Link>
          </div>
        ) : (
          <div className={styles.check}>
            <p className={styles.warning}>Please fill in all input fields!</p>

            <button
              onClick={handleValid}
              className={`btn btn-primary ${styles.btn}`}
            >
              Chek
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddProduct;
