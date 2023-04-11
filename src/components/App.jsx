import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import Basket from "./Basket";
import Store from "./Store";
import styles from "../styles/Main.module.css";

function App() {
  // СТЕЙТЫ
  const [products, setProducts] = useState([]);

  const [showProducts, setShowProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  const [newProducts, setNewProducts] = useState(() => {
    const newOwnProducts = localStorage.getItem("newProducts");
    return newOwnProducts ? JSON.parse(newOwnProducts) : [];
  });

  const [basket, setBasket] = useState(() => {
    const savedBasket = localStorage.getItem("basket");
    return savedBasket ? JSON.parse(savedBasket) : [];
  });

  const [totalPrice, setTotalPrice] = useState(() => {
    const savedTotalPrice = localStorage.getItem("totalPrice");
    return savedTotalPrice ? JSON.parse(savedTotalPrice) : 0;
  });
  // ФУНКЦИОНАЛ
  // localStorage.removeItem("totalPrice");
  // console.log(localStorage);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const newArrProducts = data.map((product) => {
          return {
            ...product,
            id: uuidv4(),
          };
        });
        setProducts([...newArrProducts, ...newProducts]);
        // setShowProducts([...newArrProducts, ...newProducts]);
      });
  }, []);
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));

    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [basket, totalPrice]);
  useEffect(() => {
    setShowProducts([...products]);
  }, [products]);

  const addToBasket = (id) => {
    const selectedProduct = showProducts.find((product) => product.id === id);
    const updateProduct = { ...selectedProduct, id: uuidv4() };

    setBasket((prevBasket) => [...prevBasket, updateProduct]);
    setTotalPrice((prev) => prev + updateProduct.price);
  };
  const deleteFromBasket = (id) => {
    const deletedProduct = basket.find((product) => product.id === id);
    setBasket(basket.filter((product) => product !== deletedProduct));
    setTotalPrice((prev) => prev - deletedProduct.price);
  };
  const toggleShow = () => {
    setIsOpen((prev) => !prev);
  };
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    filterProducts(selectedOption, e.target.value);
  };
  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
    filterProducts(e.target.value, searchInput);
  };
  const filterProducts = (category, input) => {
    let filtered = products;
    if (category !== "all") {
      filtered = products.filter((product) => product.category === category);
    }
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(input.toLowerCase())
    );
    setShowProducts(Array.from(new Set(filtered)));
    if (filtered.length === 0) {
      setIsWarning(true);
    } else {
      setIsWarning(false);
    }
  };

  return (
    <div className="App">
      {/* НАВИГАЦИЯ */}
      <nav className={styles.nav}>
        <h1>YOUR FAVORITE ONLINE STORE</h1>
        <p className="text-primary">Buy quickly and conveniently</p>

        <Link to="/add">
          <button className={`dropbtn btn btn-dark ${styles.btnAdd}`}>
            Add product
          </button>
        </Link>

        <button
          onClick={toggleShow}
          className={`dropbtn btn btn-dark ${styles.btnBasket}`}
        >
          <img src="./images/cart.png" alt="" />
        </button>
      </nav>
      {/* ОСНОВНАЯ ИНФОРМАЦИЯ */}
      {/* КОРЗИНА */}
      <div>
        {isOpen && (
          <Basket
            basket={basket}
            totalPrice={totalPrice}
            deleteFromBasket={deleteFromBasket}
          />
        )}
      </div>
      {/* МАГАЗИН И ТОВАРЫ */}
      <div>
        <div className={isOpen ? styles.halfstore : styles.fullstore}>
          {/* ПОИСК И ФИЛЬТР */}
          <div className={isOpen ? styles.halffunc : styles.fullfunc}>
            {/* ПОИСК */}
            <div className={styles.search}>
              <label htmlFor="search">Search:</label>
              <input
                value={searchInput}
                onChange={handleSearch}
                type="text"
                id="search"
                autoComplete="off"
              />
              <button className="btn">
                <img src="./images/search.png" alt="" />
              </button>
            </div>
            {/* ФИЛТР */}
            <div className={styles.filter}>
              <label htmlFor="filter">Filter by category:</label>
              <select
                onChange={handleSelect}
                value={selectedOption}
                className="form-select"
                id="filter"
              >
                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="jewelery">Jewelery</option>
                <option value={`men's clothing`}>Men's clothing</option>
                <option value={`women's clothing`}>Women's clothing</option>
                <option value={`food`}>Food</option>
                <option value={`sport`}>Sport</option>
                <option value={`childen's goods`}>Childen's goods</option>
                <option value={`a house and a garden`}>
                  A house and a garden
                </option>
                <option value={`stationery`}>Stationery</option>
                <option value={`furniture and interior`}>
                  Furniture and interior
                </option>
                <option value={`auto products`}>Auto products</option>
                <option value={`pets`}>Pets</option>
                <option value={`other`}>Other</option>
              </select>
            </div>
          </div>
          {/* ТОВАРЫ */}
          <Store
            isWarning={isWarning}
            products={showProducts.length > 0 ? showProducts : products}
            addToBasket={addToBasket}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
