import React, { useRef, useEffect, useState } from "react";
//carrusel
import slide1 from '../images/Home/slide1.png';
import slide2 from '../images/Home/slide2.png';
import slide3 from '../images/Home/slide3.png';

function HomeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [slide1, slide2, slide3];
    const slideTime = 6000; // 6 segundos
    const carruselRef = useRef(null);
  //Carrusel de slides inicial
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, slideTime);
      return () => clearInterval(interval);
    }, []);
  
    const goToPrev = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
    const goToNext = () => setCurrentSlide(prev => (prev + 1) % slides.length);

  return (
    <>
        <div className="carrusel-container">
          <div className="carrusel" ref={carruselRef} style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.5s ease' }}>
            <div className="slide">
              <img src={slide1} alt="Muebles estilo moderno" />
              <div className="slide-info">
                <p>PIEZAS EN STOCK</p>
                <h2>Entrega Inmediata</h2>
                <a href="/productos?stock">VER PRODUCTOS</a>
              </div>
            </div>
            <div className="slide">
              <img src={slide2} alt="Muebles estilo industrial" />
              <div className="slide-info">
                <h2>Nuevos Diseños</h2>
                <a href="/productos">COMPRAR AHORA</a>
              </div>
            </div>
            <div className="slide">
              <img src={slide3} alt="Muebles estilo rústico" />
              <div className="slide-info">
                <p>ELEGÍ EL TUYO</p>
                <h2>Diseños a TU medida</h2>
                <a href="/contacto#contacto-form">CONSULTAR COTIZACIÓN</a>
              </div>
            </div>
          </div>

          <button className="btn" id="prevBtn" onClick={goToPrev}>&#10094;</button>
          <button className="btn" id="nextBtn" onClick={goToNext}>&#10095;</button>

          <div className="indicadores" id="indicadores">
            {[0, 1, 2].map((i) => (
            <div key={i} className={`indicador ${currentSlide === i ? 'activo' : ''}`} onClick={() => setCurrentSlide(i)} />
          ))}
          </div>
        </div>
    </>
  );
}

export default HomeCarousel;