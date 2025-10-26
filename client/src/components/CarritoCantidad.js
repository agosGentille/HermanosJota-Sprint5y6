import React, { useEffect, useState } from "react";
import "../styles/Carrito.css";
const CarritoCantidad = ({ cantidad }) => {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (cantidad > 0) {
      setBounce(true);
      const timeout = setTimeout(() => setBounce(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [cantidad]);

  return (
    <span className={`producto-cantidad ${bounce ? "bounce" : ""}`}>
      {cantidad}
    </span>
  );
};

export default CarritoCantidad;
