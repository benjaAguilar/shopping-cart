import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styles from "./detail.module.css";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [cartText, setCartText] = useState("Add to cart");
  const [activeClass, setActiveClass] = useState(false);
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
    <div className={styles.product}>
      <img className={styles.image} src={product.image} alt="" />
      <div className={styles.details}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className={styles.price}>$ {product.price}</p>
        <div className={styles.quantity}>
          <label htmlFor="quantity">Quantity</label>
          <select
            name="quantity"
            id="quantity"
            onChange={(e) => setQuantity(e.target.value)}
          >
            {stock.map((num) => {
              return (
                <option
                  value={num}
                  key={num}
                  selected={num === 1 ? true : false}
                >
                  {num}
                </option>
              );
            })}
          </select>
          <i>(In stock: {product.stock})</i>
        </div>
        <div className={styles.btnBox}>
          <button
            onClick={() => {
              alert("this is a example btn, add to cart instead");
            }}
          >
            Buy Now
          </button>
          <button
            className={styles.addCart}
            onClick={() => {
              handleCart({ ...product, quantity: quantity });
              setActiveClass(!activeClass);
              setTimeout(() => {
                setCartText("On Cart");
              }, 299);
            }}
          >
            <span className={activeClass ? styles.animate : ""}>
              {cartText}
            </span>
            <span
              className={`${styles.onCart} ${
                activeClass ? styles.animate : ""
              }`}
            >
              On Cart
            </span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <h2>loading</h2>
  );
}

export default ProductDetail;
