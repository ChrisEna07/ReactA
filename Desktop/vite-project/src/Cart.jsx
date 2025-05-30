import React from "react";
import "./Cart.css";

function Cart({ cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart">
      <h2>Carrito</h2>
      {cart.length === 0 && <p>El carrito está vacío.</p>}
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <span>{item.name} x{item.qty}</span>
          <span>${item.price * item.qty}</span>
          <button onClick={() => removeFromCart(item.id)}>Quitar</button>
        </div>
      ))}
      <h3>Total: ${total}</h3>
    </div>
  );
}

export default Cart;