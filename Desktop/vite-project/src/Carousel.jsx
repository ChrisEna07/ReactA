import React, { useState, useEffect } from "react";
import "./Carousel.css";

function Carousel({ images }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % images.length), 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="carousel">
      <img src={images[current]} alt="" />
      <button className="carousel-btn left" onClick={() => setCurrent((current - 1 + images.length) % images.length)}>&lt;</button>
      <button className="carousel-btn right" onClick={() => setCurrent((current + 1) % images.length)}>&gt;</button>
      <div className="carousel-dots">
        {images.map((_, i) => (
          <span key={i} className={i === current ? "dot active" : "dot"} onClick={() => setCurrent(i)}></span>
        ))}
      </div>
    </div>
  );
}

export default Carousel;