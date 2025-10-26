import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
import '../styles/HeaderFooter.css';
/*Imports de Imágenes*/
import logo from '../images/logo.svg';
import menu from '../images/iconoMenu.png';

function Header({ toggleCarrito, carrito }) {
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [usuario, setUsuario] = useState({ nombre: null, email: null });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showRegister, setShowRegister] = useState(false);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cargar usuario guardado
  useEffect(() => {
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    const emailGuardado = localStorage.getItem("emailUsuario");
    if (nombreGuardado || emailGuardado) {
      setUsuario({ nombre: nombreGuardado, email: emailGuardado });
    }
  }, []);

  const handleLogin = ({ nombre, email }) => {
    setUsuario({ nombre, email });
  };

  const handleLogout = () => {
    if (window.confirm("¿Desea cerrar sesión?")) {
      localStorage.removeItem("nombreUsuario");
      localStorage.removeItem("emailUsuario");
      setUsuario({ nombre: null, email: null });
    }
  };

  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (carrito.length > 0) {
      setBounce(true);
      const timeout = setTimeout(() => setBounce(false), 300); // dura 0.3s
      return () => clearTimeout(timeout);
    }
  }, [carrito]);

  return (
    <header className='header-sticky'>
      <div className="header-marca">
        <img src={logo} alt="Logo Hermanos Jota" id="logo" />
        <p>Hermanos Jota</p>
      </div>

      <nav className={`header-nav ${isMobile && menuOpen ? 'open' : ''}`}>
        {isMobile && (
          <span className="close" onClick={() => setMenuOpen(false)}>
            &times;
          </span>
        )}
        <ul>
          <li><Link to="/">INICIO</Link></li>
          <li><Link to="/productos">PRODUCTOS</Link></li>
          <li><Link to="/contacto">CONTACTO</Link></li>
        </ul>
      </nav>

      <div className="header-right">
        {/* Icono usuario */}
        <span
          className={`material-symbols-outlined header-usuario ${usuario.nombre ? "logueado" : ""}`}
          onClick={() => (usuario.nombre ? handleLogout() : setShowLogin(true))}
          title={usuario.nombre ? "Cerrar sesión" : "Iniciar sesión"}
        >
          account_circle
        </span>

        {/* Modales */}
        <ModalLogin 
          show={showLogin} 
          onClose={() => setShowLogin(false)} 
          onLogin={handleLogin} 
          onShowRegister={() => setShowRegister(true)} 
        />
        <ModalRegister 
          show={showRegister} 
          onClose={() => setShowRegister(false)} 
          onLogin={handleLogin} 
          onShowLogin={() => setShowLogin(true)} 
        />

        {/* Carrito */}
        <div className="header-carrito-container" onClick={toggleCarrito}>
          <span className="header-carrito material-symbols-outlined" title="Carrito">
            shopping_bag
          </span>
          <span className={`numerito ${bounce ? 'bounce' : ''}`}>{carrito.length}</span>
        </div>

        {/* Menú hamburguesa para móvil */}
        {isMobile && (
          <img
            src={menu}
            alt="Icono Hamburguesa Menu"
            className="header-menu"
            onClick={() => setMenuOpen(true)}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
