import { getProducts, getCategories, getProductsByCategory } from './features/landing/services/fakestoreApi';
import React, { useReducer, useEffect, useState } from "react";
import "./shared/styles/Navbar.css";
import "./shared/styles/Footer.css";
import "./shared/styles/Carousel.css";
import './shared/styles/ProductList.css';
import "./shared/styles/ContactSection.css";
import "./shared/styles/Cart.css";
import "./shared/styles/App.css";
import Navbar from "./features/landing/components/Navbar";
import Footer from "./features/landing/components/Footer";
import Carousel from "./features/landing/components/Carousel";
import ProductList from "./features/landing/components/ProductList";
import Cart from "./features/landing/components/Cart";
import ContactSection from "./features/landing/components/ContactSection";
import ReviewForm from "./features/landing/components/ReviewForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactPage from "./features/landing/components/ContactPage";

// Reducer para el carrito
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const exists = state.find(item => item.id === action.payload.id);
      if (exists) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, qty: 1 }];
    }
    case "INCREMENT_QTY":
      return state.map(item =>
        item.id === action.payload
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    case "DECREMENT_QTY":
      return state.map(item =>
        item.id === action.payload && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      );
    case "REMOVE_FROM_CART":
      return state.filter(item => item.id !== action.payload);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    getProducts().then(setProducts);
    getCategories().then(setCategories);
  }, []);

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    if (cat) {
      getProductsByCategory(cat).then(setProducts);
    } else {
      getProducts().then(setProducts);
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar onCartClick={() => setShowCart(true)} />
        <Carousel />
        <div className="main-content">
          <h1>FakeStore Productos</h1>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Todas las categorías</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <ProductList products={products} cart={cart} dispatch={dispatch} />

          {showCart && (
            <Cart cart={cart} dispatch={dispatch} onClose={() => setShowCart(false)} />
          )}
          <ContactSection />
          <ReviewForm />
        </div>
        <Footer />
      </div>
      <Routes>
        <Route path="/contacto" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;