import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeaderFooter.css';
/*Imports de Imágenes*/
import icono_Wsp from '../images/whatsapp.png';
import icono_Ig from '../images/instagram.png';
import icono_Calendar from '../images/horario.png';

function Footer() {
  return (
    <footer>
      <div className="footer-header">
        <div className="footer-columna1">
            <p className="slogan">Redescubriendo el arte de vivir desde 2025</p>
            <Link to="/contacto">Contacto</Link>
            <div className="contactos">
                <a href="https://alt-5a31a0302d72d.blackboard.com/bbcswebdav/pid-982156-dt-content-rid-14612411_1/courses/FSD.00-43441/Instagram%20copy/index.html?one_hash=09B6754534A106E6236E16847FA662BA&f_hash=4B189AB03587F43B77B3CE8457CEF5FA"
                target="_blank" rel="noopener noreferrer">
                    <img src={icono_Ig} alt="logo instagram" id="icono-ig-contacto"/>
                </a>
                <a href="https://wa.me/541145678900" 
                target="_blank" rel="noopener noreferrer">
                    <img src={icono_Wsp} alt="logo whatsapp" id="icono-wsp-contacto"/>
                </a> 
            </div>
            <p>+54 11 4567-8900</p>
            <p>info@hermanosjota.com.ar</p>
        </div>
        <div className="footer-columna2">
            <div className="ubi-taller">
                <p>Hermanos Jota — Casa Taller</p>
                <p><b>Barrio de San Cristóbal</b>, Av. San Juan 2847 - CABA</p>
            </div> 
            <div className="horarios">
                <img src={icono_Calendar} alt="icono-horario"/>
                <div>
                    <p>Lunes a Viernes: 10:00 - 19:00 hs.</p>
                    <p>Sábados: 10:00 - 14:00 hs.</p>
                </div>
                
            </div>
        </div>
    </div>
    <p>&copy; 2025, Hermanos Jota Furniture. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
