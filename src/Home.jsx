import { useEffect, useState } from "react";
import getData from "./getData";
import { Link, Outlet } from "react-router-dom";

function Home() {
  const [sections, setSections] = useState([]);
  const [showSections, setShowSections] = useState(false);

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

  return (
    <>
      <header>
        <button onClick={toggleShowSections}>Categories</button>
        <input type="text" placeholder="Search Products" />
        <h1>My Dummy Shop</h1>
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
            <Outlet />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Home;
