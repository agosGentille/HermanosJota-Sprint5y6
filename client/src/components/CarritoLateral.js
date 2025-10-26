import React from "react";
import { Link } from "react-router-dom";
import "../styles/CarritoLateral.css";
import CarritoCantidad from "./CarritoCantidad";

function CarritoLateral({
  isAbierto,
  toggleCarrito,
  carrito,
  eliminarProducto,
  vaciarCarrito,
  sumarCantidad,
  restarCantidad,
  total
}) {
  return (
    <aside className={`carrito-lateral ${isAbierto ? "abierto" : ""}`}>
      <div className="carrito-header">
        <h2>Carrito</h2>
        <button onClick={toggleCarrito}>&times;</button>
      </div>

      <div className="carrito-productos">
        {carrito.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          carrito.map(producto => (
            <div key={producto.id} className="carrito-producto">
              <img src={producto.imagen} alt={producto.titulo} />
              <div className="carrito-info">
                <h4>{producto.titulo}</h4>
                <div className="carrito-controles">
                  <button onClick={() => restarCantidad(producto.id)}>-</button>
                  <CarritoCantidad cantidad={producto.cantidad} />
                  <button onClick={() => sumarCantidad(producto.id)}>+</button>
                </div>
                <p>${producto.Precio * producto.cantidad}</p>
                <button className="btn-eliminar" onClick={() => eliminarProducto(producto.id)}>🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>

      {carrito.length > 0 && (
        <div className="carrito-footer">
          <p>Total: ${total}</p>
          <button onClick={vaciarCarrito}>Vaciar Carrito</button>
          <Link to="/carrito" className="btn-pagar" onClick={toggleCarrito}>
            Ir al Carrito
          </Link>
        </div>
      )}
    </aside>
  );
}

export default CarritoLateral;
