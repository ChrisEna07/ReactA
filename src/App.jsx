import React, { useReducer, useEffect, useState } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Carousel from "./components/Carousel";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ContactSection from "./components/ContactSection";
import ReviewForm from "./components/ReviewForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import "./App.css";

const initialState = {
  products: [],
  cart: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_TO_CART":
      const exists = state.cart.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "INCREMENT_QTY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, qty: item.qty + 1 }
            : item
        ),
      };
    case "DECREMENT_QTY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload
            ? { ...item, qty: Math.max(1, item.qty - 1) }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SET_PRODUCTS", payload: data }));
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar
          cartCount={state.cart.length}
          onCartClick={() => setShowCart((prev) => !prev)}
        />
        <div className="main-container">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Carousel />
                  <ProductList
                    products={state.products}
                    dispatch={dispatch}
                    cart={state.cart}
                  />
                  {showCart && (
                    <Cart cart={state.cart} dispatch={dispatch} onClose={() => setShowCart(false)} />
                  )}
                  <ReviewForm />
                </>
              }
            />
            <Route path="/contacto" element={<ContactPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;