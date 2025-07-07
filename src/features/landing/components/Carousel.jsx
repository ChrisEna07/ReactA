import React, { useEffect, useState } from "react";
import "../../../shared/styles/Carousel.css";
import ropa1 from "../../../assets/ropa1.jpeg";
import ropa2 from "../../../assets/ropa2.png";
import ropa3 from "../../../assets/ropa3.avif";
import Fndoo from "../../../assets/ropa4.jpg";

const images = [Fndoo, ropa1, ropa2, ropa3];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // velocidad del cambio

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="carousel-container">
      <div
        className="carousel-slider"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <img key={i} src={img} alt={`Slide ${i}`} className="carousel-image" />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
