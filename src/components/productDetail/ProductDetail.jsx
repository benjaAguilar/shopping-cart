import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const stock = [];
  const handleCart = useOutletContext();

  if (product) {
    for (let i = 1; i <= product.stock; i++) {
      stock.push(i);
    }
  }

  useEffect(() => {
    const item = localStorage.getItem(productId);
    const product = JSON.parse(item);

    setProduct(product);
  }, [productId]);

  return product ? (
    <div>
      <img src={product.image} alt="" />
      <h2>{product.title}</h2>
      <p>$ {product.price}</p>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <select
          name="quantity"
          id="quantity"
          onChange={(e) => setQuantity(e.target.value)}
        >
          {stock.map((num) => {
            return (
              <option value={num} key={num} selected={num === 1 ? true : false}>
                {num}
              </option>
            );
          })}
        </select>
        <i>(In stock: {product.stock})</i>
      </div>
      <p>{product.description}</p>
      <button>Buy Now</button>
      <button onClick={() => handleCart({ ...product, quantity: quantity })}>
        Add to cart
      </button>
    </div>
  ) : (
    <h2>loading</h2>
  );
}

export default ProductDetail;
