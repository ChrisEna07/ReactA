import React, { useState } from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
        <p className="price-modal"><b>Precio:</b> ${product.price.toLocaleString('es-MX')}</p>
        <h3>Especificaciones:</h3>
        <ul>
          {product.specifications.map((spec, idx) => (
            <li key={idx}>{spec}</li>
          ))}
        </ul>
        <div style={{margin: "16px 0"}}>
          <label>Cantidad: </label>
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{margin: "0 5px"}}>-</button>
          {quantity}
          <button onClick={() => setQuantity(q => q + 1)} style={{margin: "0 5px"}}>+</button>
        </div>
        <button className="add-cart-btn" onClick={handleAdd}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductModal;