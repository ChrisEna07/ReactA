import React from "react";
import "../../../shared/styles/Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg" alt="Twitter" />
        </a>
        <a href="https://wa.me/573123456789" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp" />
        </a>
      </div>
      <nav className="footer-navbar">
        <a href="/">Inicio</a>
        <a href="/#productos">Productos</a>
        <a href="/contacto">Contacto</a>
      </nav>
      <div className="footer-copy">
        © 2025 FakeShop
      </div>
    </div>
  </footer>
);

export default Footer;