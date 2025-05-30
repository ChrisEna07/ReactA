import React from "react";
import "./App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#servicio">Servicio</a></li>
        <li><a href="#ensamble">Ensamble</a></li>
        <li><a href="#asesoria">Asesoría</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;