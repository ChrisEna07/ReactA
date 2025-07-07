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
import ContactPage from "./features/landing/components/ContactPage";
import Login from './features/auth/components/login';
import Register from './features/auth/components/Register';
import Dashboard from './features/auth/components/dashboard'; // <-- Importa tu dashboard
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

// Si tienes un componente para proteger rutas de admin:
import PrivateAdminRoute from '../../../FakeStore/Fake/src/features/auth/components/PrivateAdminRoute' // <-- Corrige la ruta aquí

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
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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

  // Página principal
  const HomePage = () => (
    <div className="app-container">
      <Navbar onCartClick={() => setShowCart(true)} />
      <Carousel />
      <div className="main-content">
        <h1>Nuestros Productos Fake</h1>
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
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Ruta protegida para el dashboard solo para admin */}
        <Route
          path="/dashboard"
          element={
            <PrivateAdminRoute>
              <Dashboard />
            </PrivateAdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

// /*
// -------------------------------
// Bitácora de aprendizaje
// -------------------------------
// - Se agregó la ruta "/dashboard" al router principal para que el botón Dashboard funcione.
// - Se protegió la ruta usando el componente PrivateAdminRoute, permitiendo acceso solo a administradores autenticados.
// - Se importó el componente Dashboard y el protector de rutas.
// - Aprendí cómo agregar rutas protegidas en React Router y cómo conectar la navegación de la app con los permisos