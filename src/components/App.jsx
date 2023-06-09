import { useEffect, useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Base from "./Base";
import AddProduct from "./AddProduct";
import ProductPage from "./ProductPage";
import OwnProducts from "./OwnProducts";

export const AppContext = createContext();

function App() {
  // СТЕЙТЫ
  const [products, setProducts] = useState(() => {
    const allProducts = localStorage.getItem("products");
    return allProducts ? JSON.parse(allProducts) : [];
  });

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
      });
  }, [newProducts]);
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("basket", JSON.stringify(basket));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
  }, [products, basket, totalPrice]);
  useEffect(() => {
    setShowProducts([...products]);
  }, [products]);

  const addToBasket = (id) => {
    const selectedProduct = showProducts.find((product) => product.id === id);
    const updateProduct = { ...selectedProduct, id: uuidv4(), count: 1 };
    const index = basket.findIndex(
      (product) => product.title === updateProduct.title
    );

    if (index === -1) {
      setBasket((prevBasket) => [...prevBasket, updateProduct]);
    } else {
      const updatedBasket = [...basket];
      updatedBasket[index] = {
        ...updatedBasket[index],
        count: updatedBasket[index].count + 1,
      };
      setBasket(updatedBasket);
    }
    setTotalPrice((prev) => prev + updateProduct.price);
  };
  const deleteFromBasket = (id) => {
    const deletedProduct = basket.find((product) => product.id === id);
    const index = basket.findIndex(
      (product) => product.title === deletedProduct.title
    );

    if (index === -1 || deletedProduct.count === 1) {
      setBasket(basket.filter((product) => product !== deletedProduct));
    } else {
      const updatedBasket = [...basket];
      updatedBasket[index] = {
        ...updatedBasket[index],
        count: updatedBasket[index].count - 1,
      };
      setBasket(updatedBasket);
    }

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
    <AppContext.Provider
      value={{
        addToBasket,
        toggleShow,
        isOpen,
        setIsOpen,
        searchInput,
        setSearchInput,
        handleSearch,
        handleSelect,
        selectedOption,
        isWarning,
        setIsWarning,
        showProducts,
        products,
        basket,
        totalPrice,
        deleteFromBasket,
        newProducts,
        setNewProducts,
      }}
    >
      <Routes>
        <Route path="/" element={<Base />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/own-products" element={<OwnProducts />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
