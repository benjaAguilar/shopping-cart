import { useEffect, useState } from "react";
import getData from "../../getData";
import { Link, Outlet } from "react-router-dom";
import styles from "./home.module.css";
import arrowIcon from "../../assets/arrow.svg";
import cartIcon from "../../assets/cart.svg";

function Home() {
  const [sections, setSections] = useState([]);
  const [showSections, setShowSections] = useState("none");
  const [productsCart, setProductsCart] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  if (productsCart === undefined) {
    setProductsCart([]);
  }

  useEffect(() => {
    const getCategoriesData = async () => {
      const response = await getData(
        "https://dummyjson.com/products/categories"
      );
      const sections = await response;
      setSections(sections);
    };

    getCategoriesData();
  }, []);

  const toggleShowSections = () => {
    if (showSections === "none") {
      setShowSections("block");
    } else {
      setShowSections("none");
    }
  };

  function handleCart(product) {
    const isOnCart = productsCart.filter(
      (productOnCart) => productOnCart.title === product.title
    );

    if (isOnCart.length !== 0) {
      alert("already in cart");
      return;
    }

    const prodStringed = JSON.stringify([...productsCart, product]);

    localStorage.setItem("cart", prodStringed);
    setProductsCart(JSON.parse(localStorage.getItem("cart")));
  }

  return (
    <>
      <header className={styles.header}>
        <button className={styles.btn} onClick={toggleShowSections}>
          Categories <img src={arrowIcon} alt="" />
        </button>
        <h1>My Dummy Shop</h1>
        <div>
          <Link className={styles.cart} to={"/cart"}>
            <img src={cartIcon} />
          </Link>
        </div>
      </header>
      {sections.length > 0 ? (
        <>
          <div className={styles.categories} style={{ display: showSections }}>
            <ul>
              {sections.map((section) => {
                return (
                  <li key={section.slug}>
                    <Link
                      className={styles.link}
                      to={`/${section.slug}`}
                      onClick={toggleShowSections}
                    >
                      {section.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="productsBox">
            <Outlet context={handleCart} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Home;
