import { useEffect, useState } from "react";
import getData from "./getData";
import { Link, Outlet } from "react-router-dom";

function Home() {
  const [sections, setSections] = useState([]);
  const [showSections, setShowSections] = useState(false);
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
    setShowSections(!showSections);
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
      <header>
        <button onClick={toggleShowSections}>Categories</button>
        <input type="text" placeholder="Search Products" />
        <h1>My Dummy Shop</h1>
        <div>
          <Link to={"/cart"}>Cart</Link>
          <div>{productsCart.length}</div>
        </div>
      </header>
      {sections.length > 0 ? (
        <>
          <div
            className="categories"
            style={{ display: showSections ? "block" : "none" }}
          >
            <ul>
              {sections.map((section) => {
                return (
                  <Link key={section.slug} to={`/${section.slug}`}>
                    {section.name}
                  </Link>
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
