// Footer.jsx
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      </div>
      <p>&copy; 2025 Compunet - Todos los derechos reservados</p>
    </footer>
  );
}

export default Footer;