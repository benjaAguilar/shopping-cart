import propTypes from "prop-types";
import styles from "./cards.module.css";
import detailIcon from "../../assets/detail.svg";

function ProductsCards({ products, handleProductClick }) {
  return (
    <div className={styles.cardContainer}>
      {products.map((product) => {
        return (
          <div
            className={styles.card}
            key={product.id}
            onClick={() => handleProductClick(product)}
          >
            <img src={product.images[0]} alt="" />
            <p className={styles.price}>$ {product.price}</p>
            <p>{product.title}</p>
            <div className={styles.icon}>
              <img src={detailIcon} alt="" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

ProductsCards.propTypes = {
  products: propTypes.array.isRequired,
  handleProductClick: propTypes.func.isRequired,
};

export default ProductsCards;
