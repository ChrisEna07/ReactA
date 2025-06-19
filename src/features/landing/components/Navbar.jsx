import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../shared/styles/Navbar.css";

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = ({ cartCount, onCartClick }) => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            Random Fake Shop de Chriz
          </Link>
        </div>
        <ul className="navbar-links">
          <li>
            {location.pathname === "/" ? (
              <a
                href="#productos"
                onClick={e => {
                  e.preventDefault();
                  scrollToSection("productos");
                }}
              >
                Productos
              </a>
            ) : (
              <Link to="/#productos">Productos</Link>
            )}
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            {location.pathname === "/" ? (
              <a
                href="#opiniones"
                onClick={e => {
                  e.preventDefault();
                  scrollToSection("opiniones");
                }}
              >
                Opiniones
              </a>
            ) : (
              <Link to="/#opiniones">Opiniones</Link>
            )}
          </li>
        </ul>
        <div
          className="navbar-cart"
          onClick={onCartClick}
          style={{ cursor: "pointer" }}
        >
          🛒 <span>{cartCount}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;