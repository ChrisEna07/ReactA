import React from "react";
import "./ProductSlider.css";

function ProductSlider({ products, addToCart }) {
  return (
    <div className="product-slider">
      {products.map((p) => (
        <div className="product-card" key={p.id}>
          <img src={p.img} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
          <button onClick={() => addToCart(p)}>Agregar</button>
        </div>
      ))}
    </div>
  );
}

export default ProductSlider;