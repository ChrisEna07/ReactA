import React from "react";
import "../../../shared/styles/ProductList.css";

const ProductList = ({ products = [], dispatch = () => {}, cart = [] }) => (
  <section id="productos" className="product-list">
    <h2 style={{ textAlign: "center" }}>Productos</h2>
    <div className="products-grid">
      {products.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);
        const qty = cartItem ? cartItem.qty : 0;
        return (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <div className="price">${product.price}</div>
            <div className="qty-controls">
              <button
                className="qty-btn"
                onClick={() =>
                  qty > 0
                    ? dispatch({ type: "DECREMENT_QTY", payload: product.id })
                    : null
                }
                disabled={qty === 0}
              >
                -
              </button>
              <span className="qty-value">{qty}</span>
              <button
                className="qty-btn"
                onClick={() =>
                  qty > 0
                    ? dispatch({ type: "INCREMENT_QTY", payload: product.id })
                    : dispatch({ type: "ADD_TO_CART", payload: product })
                }
              >
                +
              </button>
            </div>
            <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}>
              Agregar al carrito
            </button>
          </div>
        );
      })}
    </div>
  </section>
);

export default ProductList;