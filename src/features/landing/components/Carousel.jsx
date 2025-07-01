import React, { useState, useEffect } from "react";
import "../../../shared/styles/Carousel.css";

// Importa las imágenes locales
import ropa1 from "../../../assets/ropa1.jpeg";
import ropa2 from "../../../assets/ropa2.jpeg";
import ropa3 from "../../../assets/ropa3.avif";
import Fndoo from "../../../assets/Fndoo.jpg";

const images = [
  Fndoo,
  ropa1,
  ropa2,
  ropa3,
];

const Carousel = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % images.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel">
      <img src={images[idx]} alt={`Carrusel imagen ${idx + 1}`} />
    </div>
  );
};

export default Carousel;