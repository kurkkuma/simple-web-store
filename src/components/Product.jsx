import React, { useState } from "react";
import styles from "../styles/Store.module.css";

function Product({
  id,
  image,
  title,
  description,
  price,
  category,
  rate,
  count,
  addToBasket,
}) {
  const [isHover, setIsHover] = useState(false);
  const validTitle = title.length > 40 ? title.slice(0, 40) : title;

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img src={image} alt="" />
      {/* {isHover && <h5 className={styles.hoverPrice}>Price: </h5>} */}

      {!isHover && <h5>{validTitle}...</h5>}
      <div className={styles.hoverBox}>
        {isHover && <h5>{title}</h5>}

        {isHover && (
          <p className={styles.description}>
            {description.length > 420 ? description.slice(0, 420) : description}
          </p>
        )}
      </div>

      {isHover ? (
        <div className={styles.hoverPrice}>
          <h5>Price:</h5>
          <h3>{price}$</h3>
        </div>
      ) : (
        <h3>{price}$</h3>
      )}
      {/* <h3 className={isHover && styles.hoverPrice}>{price}$</h3> */}
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
