import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TarjetaProd.css';

function TarjetasProductos({ productos, mostrarMax, onAddToCart }) {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    if (productos.length > 0) {
      const timeout = setTimeout(() => setMostrar(true), 100);
      return () => clearTimeout(timeout);
    }
  }, [productos]);

  const lista = mostrarMax ? productos.slice(0, mostrarMax) : productos;

  return (
    <>
      {lista.map((producto) => (
        <div key={producto._id} className={`tarjeta-producto ${mostrar ? 'mostrar' : ''}`}>
          <div className="fondo-tarjeta">
            <div className='info-producto'>
              <Link to={`/ProductDetail/${producto._id}`}>
                <h3>{producto.titulo}</h3>
                <div className="tarjeta-foto">
                  <img src={producto.imagen} alt={producto.titulo} className="img-normal" />
                  <img src={producto.imagenHover} alt={producto.titulo} className="img-hover" />
                </div>
                <p>${producto.Precio.toLocaleString('es-AR')}</p>
              </Link>
            </div>

            <div
              className="btnAgregarCarrito"
              onClick={() => onAddToCart(producto)}
              style={{ cursor: "pointer" }}
            >
              <span className="material-symbols-outlined">shopping_bag</span>
              <span> | Comprar </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default TarjetasProductos;