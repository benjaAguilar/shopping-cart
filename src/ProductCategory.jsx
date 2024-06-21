import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getData from "./getData";

function ProductCategory() {
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

  return (
    <>
      {products.length > 0 ? (
        <>
          {products.map((product) => {
            return (
              <div key={product.id}>
                <img src={product.images[0]} alt="" />
                <p>{product.title}</p>
              </div>
            );
          })}
        </>
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
