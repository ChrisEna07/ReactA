import React from 'react';
import './Card.css';

const Card = ({ product, onSelect }) => (
  <div className="card-futuristic" onClick={() => onSelect(product)} style={{ cursor: 'pointer' }}>
    <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '10px 10px 0 0' }} />
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <p className="price">${product.price.toLocaleString('es-MX')}</p>
  </div>
);

export default Card;