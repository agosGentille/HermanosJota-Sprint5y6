import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
/*
Importar piezas de React Router:
  BrowserRouter (alias Router) — maneja el history API del navegador (URLs "bonitas" sin # como antes con html).
  Routes — contenedor de rutas (funciona como el Switch antiguo).
  Route — define una ruta individual (path → componente).
*/
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './components/ProductDetail';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import CarritoLateral from './components/CarritoLateral';
import { cargarCarrito, guardarCarrito } from './components/CarritoStorage';
import Producto from './pages/Productos';
import { agregarProducto, eliminarProducto, vaciarCarrito, sumarCantidad, restarCantidad, calcularTotal } from './components/CarritoFunciones';

function App() {
  const [isCarritoAbierto, setIsCarritoAbierto] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const usuario = localStorage.getItem("emailUsuario");
  const saveTimeout = useRef(null);
  const toggleCarrito = () => setIsCarritoAbierto(prev => !prev);
  // Cargar carrito al iniciar
  useEffect(() => {
    const initCarrito = async () => {
      const data = await cargarCarrito(usuario);
      setCarrito(data || []);
    };
    initCarrito();
  }, [usuario]);
  // Guardar carrito en localStorage y backend con retraso para no saturar el server.
  useEffect(() => {
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
    if (usuario) {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(() => {
        guardarCarrito(usuario, carrito);
      }, 1000);
      return () => {
        if (saveTimeout.current) clearTimeout(saveTimeout.current);
      };
    }
  }, [carrito, usuario]);

  const total = calcularTotal(carrito);
  // Funciones del carrito agrupadas, accedan a ellas con carritoFunciones.laQueNecesiten o solo ...carritoFunciones si quieren todas.
  const carritoFunciones = {
    agregarProducto: (producto) => agregarProducto(carrito, setCarrito, producto),
    eliminarProducto: (id) => eliminarProducto(carrito, setCarrito, id),
    vaciarCarrito: () => vaciarCarrito(setCarrito),
    sumarCantidad: (id) => sumarCantidad(carrito, setCarrito, id),
    restarCantidad: (id) => restarCantidad(carrito, setCarrito, id),
  };

  return (
    <Router>
      {/*Es el "provider" del router. TODO lo que use rutas (Links, useParams, useNavigate, <Routes>...) 
      debe estar dentro de este componente.  Si ponemos x ej el Header fuera del Router, los Link 
      dentro de Header no funcionarían.*/}
      {
        /*Se usa header y footer fuera de <Routes> para que se renderice en TODAS las pags */
      }
      <Header toggleCarrito={toggleCarrito} carrito={carrito} />
      <CarritoLateral
        isAbierto={isCarritoAbierto}
        toggleCarrito={toggleCarrito}
        carrito={carrito}
        total={total}
        {...carritoFunciones}
      />
      <Routes>
        {/*Contiene las rutas declaradas. React Router evalúa cuál Route coincide con la 
        URL actual y renderiza su element */}
        <Route path="/" element={<Home onAddToCart={carritoFunciones.agregarProducto} />} />
        <Route path="/carrito" element={
          <Carrito carrito={carrito} {...carritoFunciones} />
        } />
        <Route path="/productos" element={<Producto onAddToCart={carritoFunciones.agregarProducto} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/ProductDetail/:id" element={
          <ProductDetail onAddToCart={carritoFunciones.agregarProducto} />
        } />
        {/*path: Es la ruta de la URL. Puede ser estática "/contacto" o dinámica como en "/ProductDetail/:id" 
         donde el :id es un parámetro de ruta al cual se accede por useParams()*/}
         {/*element: Es el componente React que se renderiza cuando la URL coincide con 
         el path, puede incluir props */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;