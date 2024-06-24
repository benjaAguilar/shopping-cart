import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getData from "./getData";
import ProductsCards from "./productsCards";
import { product } from "./product";

function ProductCategory() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { categoriesId } = useParams();

  useEffect(() => {
    const showSectionProducts = async () => {
      try {
        const response = await getData(
          `https://dummyjson.com/products/category/${categoriesId}`
        );

        setProducts(response.products);
      } catch (e) {
        console.log(e);
        return;
      }
    };

    showSectionProducts();
  }, [categoriesId]);

  function HandleProductClick(clickedProd) {
    product.image = clickedProd.images[0];
    product.title = clickedProd.title;
    product.price = clickedProd.price;
    product.stock = clickedProd.stock;
    product.description = clickedProd.description;

    const prod = JSON.stringify(product);

    localStorage.setItem(`${clickedProd.id}`, prod);

    navigate(`${clickedProd.id}`);
  }

  return (
    <>
      {products.length > 0 ? (
        <ProductsCards
          products={products}
          handleProductClick={HandleProductClick}
        />
      ) : (
        <>
          <h2>Oops Product not found!</h2>
          <p>
            <i>Seems that we dont have that product for you...</i>
          </p>
          <i>try another one</i>
        </>
      )}
    </>
  );
}

export default ProductCategory;
