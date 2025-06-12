import React, { useState } from "react";
import "./Cart.css";

const Cart = ({ cart, dispatch, onClose }) => {
  const [pagoExitoso, setPagoExitoso] = useState(false);

  const handlePagar = () => {
    setPagoExitoso(true);
    setTimeout(() => {
      setPagoExitoso(false);
      dispatch({ type: "CLEAR_CART" });
      if (onClose) onClose();
    }, 2000);
  };

  return (
    <div className="cart-modal-bg">
      <div className="cart-modal">
        <div className="cart-title">
          🛒 Carrito de Compras
          {onClose && (
            <button className="cart-close-btn" onClick={onClose}>
              ✖
            </button>
          )}
        </div>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Detalle</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Total</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td style={{ maxWidth: "200px", fontSize: "0.95em" }}>{item.description}</td>
                    <td>
                      <button
                        className="qty-btn"
                        onClick={() => dispatch({ type: "DECREMENT_QTY", payload: item.id })}
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <span className="qty-value">{item.qty}</span>
                      <button
                        className="qty-btn"
                        onClick={() => dispatch({ type: "INCREMENT_QTY", payload: item.id })}
                      >
                        +
                      </button>
                    </td>
                    <td>${item.price}</td>
                    <td>${(item.price * item.qty).toFixed(2)}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-total">
              <strong>
                Total: $
                {cart.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
              </strong>
              <button
                className="clear-cart-btn"
                onClick={() => dispatch({ type: "CLEAR_CART" })}
              >
                Vaciar carrito
              </button>
              <button
                className="pay-btn"
                onClick={handlePagar}
                style={{
                  marginLeft: "1rem",
                  background: "#4caf50",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
                disabled={pagoExitoso}
              >
                {pagoExitoso ? "Procesando..." : "Pagar"}
              </button>
            </div>
            {pagoExitoso && (
              <div style={{ color: "#4caf50", marginTop: "1rem", fontWeight: "bold" }}>
                ¡Pago realizado con éxito!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;