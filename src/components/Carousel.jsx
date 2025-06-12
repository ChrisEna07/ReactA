import React, { useState, useEffect } from "react";
import "./Carousel.css"; // Asegúrate de tener un archivo CSS para estilos

const images = [
  "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
];

const Carousel = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % images.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel">
      <img src={images[idx]} alt="Carrusel Rafa Motos" />
    </div>
  );
};

export default Carousel;