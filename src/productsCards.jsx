import propTypes from "prop-types";

function ProductsCards({ products, handleProductClick }) {
  return (
    <>
      {products.map((product) => {
        return (
          <div key={product.id} onClick={() => handleProductClick(product)}>
            <img src={product.images[0]} alt="" />
            <p>{product.title}</p>
          </div>
        );
      })}
    </>
  );
}

ProductsCards.propTypes = {
  products: propTypes.array.isRequired,
  handleProductClick: propTypes.func.isRequired,
};

export default ProductsCards;
