import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PerfilUsuario from './pages/PerfilUsuario';
import ProductDetail from './components/ProductDetail';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import CarritoLateral from './components/CarritoLateral';
import { cargarCarrito, guardarCarrito } from './components/CarritoStorage';
import Producto from './pages/Productos';
import { agregarProducto, eliminarProducto, vaciarCarrito, sumarCantidad, restarCantidad, calcularTotal } from './components/CarritoFunciones';
import AdminProductForm from './components/AdminProductForm';

function App() {
  const [isCarritoAbierto, setIsCarritoAbierto] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const saveTimeout = useRef(null);
  const toggleCarrito = () => setIsCarritoAbierto(prev => !prev);

  // Función para verificar y cargar el usuario
  const cargarUsuario = () => {
    const usuarioEmail = localStorage.getItem("emailUsuario");
    if (usuarioEmail) {
      // Definir lógica para determinar si es admin

      //utilicen alguno de estos emails para que les aparezcan las opcione de administrar.
      const emailsAdmin = ['admin@muebleriajota.com', 'administrador@hermanosjota.com', 'test@admin.com'];
      const esAdmin = emailsAdmin.includes(usuarioEmail);
      
      setUsuario({
        email: usuarioEmail,
        rol: esAdmin ? 'admin' : 'user'
      });
      return usuarioEmail;
    } else {
      setUsuario(null);
      return null;
    }
  };

  // Cargar carrito y usuario al iniciar
  useEffect(() => {
    const usuarioEmail = cargarUsuario();
    const initCarrito = async () => {
      const data = await cargarCarrito(usuarioEmail);
      setCarrito(data || []);
    };
    initCarrito();
  }, []);

  // Escuchar cambios en localStorage para actualizar usuario
  useEffect(() => {
    const handleStorageChange = () => {
      cargarUsuario();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // También verificar periódicamente (por si las dudas)
    const interval = setInterval(cargarUsuario, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Guardar carrito en localStorage y backend
  useEffect(() => {
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
    const usuarioEmail = localStorage.getItem("emailUsuario");
    if (usuarioEmail) {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      saveTimeout.current = setTimeout(() => {
        guardarCarrito(usuarioEmail, carrito);
      }, 1000);
      return () => {
        if (saveTimeout.current) clearTimeout(saveTimeout.current);
      };
    }
  }, [carrito]);

  const total = calcularTotal(carrito);

  const carritoFunciones = {
    agregarProducto: (producto) => agregarProducto(carrito, setCarrito, producto),
    eliminarProducto: (id) => eliminarProducto(carrito, setCarrito, id),
    vaciarCarrito: () => vaciarCarrito(setCarrito),
    sumarCantidad: (id) => sumarCantidad(carrito, setCarrito, id),
    restarCantidad: (id) => restarCantidad(carrito, setCarrito, id),
  };

  const handleLogout = () => {
    localStorage.clear();
    setUsuario(null);
    window.location.href = '/';
  };

  // Función para verificar si es admin
  const esAdmin = usuario && usuario.rol === 'admin';

  // DEBUG: Mostrar estado del usuario en consola
  useEffect(() => {
    console.log('Estado usuario:', usuario);
    console.log('Es admin:', esAdmin);
  }, [usuario, esAdmin]);

  return (
    <Router>
      <Header 
        toggleCarrito={toggleCarrito} 
        carrito={carrito} 
        usuario={usuario}
        esAdmin={esAdmin}
        onLogout={handleLogout}
      />
      <CarritoLateral
        isAbierto={isCarritoAbierto}
        toggleCarrito={toggleCarrito}
        carrito={carrito}
        total={total}
        {...carritoFunciones}
      />
      <Routes>
        <Route path="/" element={<Home onAddToCart={carritoFunciones.agregarProducto} />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} {...carritoFunciones} />} />
        <Route path="/productos" element={<Producto onAddToCart={carritoFunciones.agregarProducto} />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/ProductDetail/:id" element={
          <ProductDetail 
            onAddToCart={carritoFunciones.agregarProducto} 
            esAdmin={esAdmin} 
          />
        } />
        <Route path="/profile" element={<PerfilUsuario usuario={usuario} onLogout={handleLogout} />} />
        
        {/* Rutas protegidas para admin */}
        <Route 
          path="/admin/crear-producto" 
          element={esAdmin ? <AdminProductForm /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin/editar-producto/:id" 
          element={esAdmin ? <AdminProductForm editMode={true} /> : <Navigate to="/" />} 
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;