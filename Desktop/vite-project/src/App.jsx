import React, { useState } from "react";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import ProductSlider from "./ProductSlider";
import Cart from "./Cart";
import Footer from "./Footer";
import ContactSection from "./ContactSection";
import "./App.css";

const products = [
  { id: 1, name: "Procesador Ryzen 5", price: 150, img: "https://m.media-amazon.com/images/I/71S31CWSs3L._AC_SL1500_.jpg" },
  { id: 2, name: "Tarjeta Madre B550", price: 120, img: "https://m.media-amazon.com/images/I/81vpsIs58WL._AC_SL1500_.jpg" },
  { id: 3, name: "Memoria RAM 16GB", price: 60, img: "https://m.media-amazon.com/images/I/61X6AKwQnGL._AC_SL1500_.jpg" },
  { id: 4, name: "SSD 1TB", price: 90, img: "https://m.media-amazon.com/images/I/71kWymZ+Q0L._AC_SL1500_.jpg" },
  { id: 5, name: "Fuente 650W", price: 70, img: "https://m.media-amazon.com/images/I/81Zb5Zl8QwL._AC_SL1500_.jpg" },
];

const carouselImages = [
  "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="main-layout">
        <div className="container">
          <h1>Tienda de Componentes de PC</h1>
          <Carousel images={carouselImages} />

          <section id="servicio">
            <h2>Servicio</h2>
            <p>
              En <b>CompuNet</b> ofrecemos diagnóstico, reparación y mantenimiento para todo tipo de computadoras de escritorio y laptops. Nuestro equipo técnico está capacitado para resolver problemas de hardware y software, limpieza interna, actualización de sistemas y optimización de rendimiento.
            </p>
            <ul>
              <li>Diagnóstico gratuito</li>
              <li>Reparación de placas madre, fuentes, memorias y discos</li>
              <li>Instalación de sistemas operativos y programas</li>
              <li>Limpieza y cambio de pasta térmica</li>
            </ul>
          </section>

          <section id="ensamble">
            <h2>Ensamble</h2>
            <p>
              ¿Quieres una PC a tu medida? Armamos tu computadora según tus necesidades: gaming, oficina, diseño o estudio. Te asesoramos en la elección de cada componente y realizamos el ensamble profesional con pruebas de funcionamiento.
            </p>
            <ul>
              <li>Asesoría personalizada en la selección de componentes</li>
              <li>Ensamble profesional y cableado limpio</li>
              <li>Pruebas de estabilidad y rendimiento</li>
              <li>Entrega lista para usar</li>
            </ul>
          </section>

          <section id="asesoria">
            <h2>Asesoría</h2>
            <p>
              ¿Tienes dudas sobre qué comprar o cómo mejorar tu equipo? Te orientamos sin compromiso. Analizamos tu caso y te recomendamos la mejor opción en base a tu presupuesto y necesidades.
            </p>
            <ul>
              <li>Recomendaciones para upgrades</li>
              <li>Comparativa de componentes</li>
              <li>Soluciones para problemas de compatibilidad</li>
              <li>Atención presencial y en línea</li>
            </ul>
          </section>

          <h2>Productos</h2>
          <ProductSlider products={products} addToCart={addToCart} />
          <ContactSection />
        </div>
        {/* Aside derecho solo si hay productos en el carrito */}
        {cart.length > 0 && (
          <aside className="cart-aside">
            <Cart cart={cart} removeFromCart={removeFromCart} />
          </aside>
        )}
      </div>
      <Footer />
    </>
  );
}

export default App;