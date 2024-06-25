import { useEffect, useState } from "react";
import styles from "./cart.module.css";

function Cart() {
  const [cartProducts, setCartProducts] = useState();
  let total = 0;

  if (cartProducts) {
    cartProducts.map((product) => {
      total += product.price * product.quantity;
    });
  }

  useEffect(() => {
    const items = localStorage.getItem("cart");
    const products = JSON.parse(items);

    setCartProducts(products);
  }, []);

  function deleteItem(name) {
    const filteredItems = cartProducts.filter(
      (product) => product.title !== name
    );

    const stringed = JSON.stringify(filteredItems);

    localStorage.setItem("cart", stringed);
    setCartProducts(filteredItems);
  }

  return cartProducts ? (
    <div className={styles.box}>
      <div className={styles.cardBox}>
        {cartProducts.map((product) => {
          return (
            <div className={styles.card} key={product.title}>
              <img src={product.image} alt="" />
              <h3>{product.title}</h3>
              <p>Quantity: {product.quantity}</p>
              <p className={styles.price}>{product.price * product.quantity}</p>
              <button onClick={() => deleteItem(product.title)}>Remove</button>
            </div>
          );
        })}
      </div>

      <h2>Total: $ {total}</h2>
    </div>
  ) : (
    <h2>No items yet</h2>
  );
}

export default Cart;
