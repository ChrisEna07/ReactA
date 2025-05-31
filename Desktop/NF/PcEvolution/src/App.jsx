import nvidiaImg from './assets/nvidia.png';
import gigabyteImg from './assets/gigabyte.png';
import amdImg from './assets/amd.jpg';
import React, { useState, useEffect } from 'react';
import { products } from './data/products';
import Card from './compononents/Card';
import ProductModal from './compononents/ProductModal';
import ContactForm from './compononents/ContactForm';
import './App.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [cart, setCart] = useState([]);
  const [section, setSection] = useState('inicio');

  // Carrousel imágenes locales
  const carouselImages = [
    {
      src: nvidiaImg,
      alt: "Lanzamiento Nvidia",
      caption: "Nueva Nvidia RTX 5090"
    },
    {
      src: gigabyteImg,
      alt: "Lanzamiento Gigabyte",
      caption: "Motherboards Gigabyte Z890"
    },
    {
      src: amdImg,
      alt: "Lanzamiento AMD",
      caption: "AMD Ryzen 9000X"
    }
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex(idx => (idx + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Agregar producto al carrito con cantidad
  const handleAddToCart = (product, quantity) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    setSelectedProduct(null);
    setSelectedIndex(null);
  };

  // Eliminar producto del carrito
  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Cambiar cantidad en el carrito
  const handleChangeQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calcular el total del carrito
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="app-bg">
      <header className="header-futuristic">
        <nav className="navbar dark-navbar">
          <span
            className="logo-navbar"
            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
            onClick={() => setSection('inicio')}
          >
            {/* Ícono de chip SVG */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="3" fill="#A3FFD6" stroke="#00ffea" strokeWidth="2" />
              <rect x="8" y="8" width="8" height="8" rx="1.5" fill="#232946" />
            </svg>
            <span style={{ fontWeight: 700, fontSize: "1.5rem", color: "#A3FFD6", textShadow: "0 0 10px #00ffea, 0 0 20px #00ffea", fontFamily: "'Orbitron', Arial, sans-serif" }}>
              PcEvo
            </span>
          </span>
          <div className="nav-links">
            <button onClick={() => setSection('inicio')}>Inicio</button>
            <button onClick={() => setSection('componentes')}>Componentes</button>
            <button onClick={() => setSection('carrito')}>
              Carrito <span className="cart-count">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </button>
            <button onClick={() => setSection('contacto')}>Contacto</button>
          </div>
        </nav>
      </header>
      <main>
        <h1 className="title-futuristic">PcEvolucion</h1>
        {section === 'inicio' && (
          <div className="inicio-section">
            <p className="bienvenida-neon">
              Bienvenido a PcEvolucion, tu tienda de componentes de Confianza.
            </p>
            {/* Carrousel */}
            <div className="carousel-container">
              <img
                src={carouselImages[carouselIndex].src}
                alt={carouselImages[carouselIndex].alt}
                className="carousel-image"
              />
              <div className="carousel-caption">{carouselImages[carouselIndex].caption}</div>
              <div className="carousel-controls">
                {carouselImages.map((_, idx) => (
                  <button
                    key={idx}
                    className={`carousel-dot${carouselIndex === idx ? ' active' : ''}`}
                    onClick={() => setCarouselIndex(idx)}
                    aria-label={`Ir a slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            {/* Noticias y lanzamientos */}
            <h2 className="noticias-title">Noticias y Lanzamientos</h2>
            <div className="noticias-container">
              <div className="noticia-card">
                <img src={nvidiaImg} alt="Nvidia" />
                <h3>Nvidia lanza la RTX 5090</h3>
                <p>La nueva generación de tarjetas gráficas RTX 5090 promete un salto de rendimiento del 50% respecto a la generación anterior.</p>
                <span className="noticia-fecha">Mayo 2025</span>
              </div>
              <div className="noticia-card">
                <img src={gigabyteImg} alt="Gigabyte" />
                <h3>Gigabyte presenta motherboards Z890</h3>
                <p>Compatibles con los nuevos procesadores Intel de 15ª generación y soporte para DDR5 de hasta 9000MHz.</p>
                <span className="noticia-fecha">Abril 2025</span>
              </div>
              <div className="noticia-card">
                <img src={amdImg} alt="AMD" />
                <h3>AMD Ryzen 9000X anunciado</h3>
                <p>AMD revela su nueva línea de procesadores con arquitectura Zen 5, mayor eficiencia y rendimiento para gamers y creadores.</p>
                <span className="noticia-fecha">Marzo 2025</span>
              </div>
            </div>
          </div>
        )}
        {section === 'componentes' && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: "32px" }}>
            <div className="cards-container" style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: "24px", position: "relative" }}>
              {products.map((product, idx) => (
                <React.Fragment key={product.id}>
                  <Card
                    product={product}
                    onSelect={() => {
                      setSelectedProduct(product);
                      setSelectedIndex(idx);
                    }}
                  />
                  {selectedProduct && selectedIndex === idx && (
                    <div style={{
                      position: "absolute",
                      left: `${(idx % 3) * 320}px`,
                      top: `${Math.floor(idx / 3) * 340 + 220}px`,
                      zIndex: 10
                    }}>
                      <ProductModal
                        product={selectedProduct}
                        onClose={() => { setSelectedProduct(null); setSelectedIndex(null); }}
                        onAddToCart={handleAddToCart}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <aside style={{ minWidth: 340, maxWidth: 400 }}>
              <h3 style={{ color: "#A3FFD6", textShadow: "0 0 10px #00ffea", marginBottom: 12 }}>Ofertas de Componentes en Amazon</h3>
              <a
                href="https://www.amazon.com.mx/s?k=motherboard"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  background: "#A3FFD6",
                  color: "#232946",
                  fontWeight: "bold",
                  padding: "14px 24px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  boxShadow: "0 0 10px #00ffea",
                  marginBottom: "18px",
                  textAlign: "center"
                }}
              >
                Ofertas de Motherboards
              </a>
              <a
                href="https://www.amazon.com.mx/s?k=procesador+intel"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  background: "#A3FFD6",
                  color: "#232946",
                  fontWeight: "bold",
                  padding: "14px 24px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  boxShadow: "0 0 10px #00ffea",
                  marginBottom: "18px",
                  textAlign: "center"
                }}
              >
                Ofertas de Procesadores
              </a>
              <a
                href="https://www.amazon.com.mx/s?k=tarjeta+gráfica"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  background: "#A3FFD6",
                  color: "#232946",
                  fontWeight: "bold",
                  padding: "14px 24px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  boxShadow: "0 0 10px #00ffea",
                  marginBottom: "18px",
                  textAlign: "center"
                }}
              >
                Ofertas de Tarjetas Gráficas
              </a>
              <a
                href="https://www.amazon.com.mx/s?k=memoria+ram"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  background: "#A3FFD6",
                  color: "#232946",
                  fontWeight: "bold",
                  padding: "14px 24px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  boxShadow: "0 0 10px #00ffea",
                  marginBottom: "18px",
                  textAlign: "center"
                }}
              >
                Ofertas de Memorias RAM
              </a>
              <a
                href="https://www.amazon.com.mx/s?k=ssd"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  background: "#A3FFD6",
                  color: "#232946",
                  fontWeight: "bold",
                  padding: "14px 24px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  boxShadow: "0 0 10px #00ffea",
                  marginBottom: "18px",
                  textAlign: "center"
                }}
              >
                Ofertas de SSD
              </a>
              <a
                href="https://www.amazon.com.mx/s?k=fuente+de+poder"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  background: "#A3FFD6",
                  color: "#232946",
                  fontWeight: "bold",
                  padding: "14px 24px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  boxShadow: "0 0 10px #00ffea",
                  marginBottom: "18px",
                  textAlign: "center"
                }}
              >
                Ofertas de Fuentes de Poder
              </a>
              <a
                href="https://www.amazon.com.mx/s?k=gabinete+pc"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  background: "#A3FFD6",
                  color: "#232946",
                  fontWeight: "bold",
                  padding: "14px 24px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  boxShadow: "0 0 10px #00ffea",
                  marginBottom: "18px",
                  textAlign: "center"
                }}
              >
                Ofertas de Gabinetes
              </a>
            </aside>
          </div>
        )}
        {section === 'carrito' && (
          <div className="cart-section">
            <h2>Carrito de compras</h2>
            {cart.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              <>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id} style={{ marginBottom: 10 }}>
                      <b>{item.name}</b> <br />
                      <span>Precio: ${item.price.toLocaleString('es-MX')}</span> <br />
                      <span>
                        Cantidad:
                        <button onClick={() => handleChangeQuantity(item.id, item.quantity - 1)} style={{ margin: "0 5px" }}>-</button>
                        {item.quantity}
                        <button onClick={() => handleChangeQuantity(item.id, item.quantity + 1)} style={{ margin: "0 5px" }}>+</button>
                      </span>
                      <br />
                      <span>Subtotal: ${(item.price * item.quantity).toLocaleString('es-MX')}</span>
                      <br />
                      <button onClick={() => handleRemoveFromCart(item.id)} style={{ marginTop: 5, background: "#ff4d4d", color: "#fff", border: "none", borderRadius: 5, padding: "4px 10px", cursor: "pointer" }}>Eliminar</button>
                    </li>
                  ))}
                </ul>
                <hr />
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Total: ${total.toLocaleString('es-MX')}</p>
              </>
            )}
          </div>
        )}
        {section === 'contacto' && (
          <div className="contact-section">
            <h2>Contacto</h2>
            <p>Puedes encontrarnos en nuestra tienda física o escribirnos por correo.</p>
            <div className="contact-info">
              <div>
                <b>Dirección:</b> Carrera 54 #69A-07 Tricentenario<br />
                <b>Email:</b> contacto@pcevolucion.com<br />
                <b>Teléfono:</b> +573183517802
              </div>
              <iframe
                title="Ubicación PcEvolucion"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-75.5670%2C6.2865%2C-75.5642%2C6.2893&amp;layer=mapnik&marker=6.2890,-75.5634"
                style={{ border: 0, width: "100%", height: "250px", marginTop: "20px", borderRadius: "12px" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            {/* Formulario de registro */}
            <ContactForm />
          </div>
        )}
      </main>
      <footer className="footer-futuristic">
        <div className="footer-nav-links" style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "10px" }}>
          <button onClick={() => setSection('inicio')}>Inicio</button>
          <button onClick={() => setSection('componentes')}>Componentes</button>
          <button onClick={() => setSection('carrito')}>
            Carrito <span className="cart-count">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
          </button>
          <button onClick={() => setSection('contacto')}>Contacto</button>
        </div>
        <p>&copy; {new Date().getFullYear()} PcEvolucion - Todos los derechos reservados.</p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg" alt="Twitter" />
          </a>
          <a href="https://www.instagram.com/evolucion07/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;