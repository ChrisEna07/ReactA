import procesadorImg from '../assets/procesador.jpg';
import graficaImg from '../assets/grafica.jpg';
import ramImg from '../assets/ram.jpg';

export const products = [
  {
    id: 1,
    name: "Procesador Intel Core i9",
    image: procesadorImg,
    description: "Procesador de alto rendimiento para gaming y creación de contenido.",
    price: 10500,
    specifications: [
      "Núcleos: 8",
      "Hilos: 16",
      "Frecuencia base: 3.6GHz",
      "Socket: LGA1200"
    ]
  },
  {
    id: 2,
    name: "Tarjeta Gráfica RTX 4090",
    image: graficaImg,
    description: "Gráfica de última generación para juegos en 4K y VR.",
    price: 42000,
    specifications: [
      "Memoria: 24GB GDDR6X",
      "Núcleos CUDA: 16384",
      "Consumo: 450W"
    ]
  },
  {
    id: 3,
    name: "Memoria RAM 32GB DDR5",
    image: ramImg,
    description: "Memoria RAM ultra rápida para multitarea extrema.",
    price: 3200,
    specifications: [
      "Capacidad: 32GB",
      "Velocidad: 6000MHz",
      "Tipo: DDR5"
    ]
  }
];