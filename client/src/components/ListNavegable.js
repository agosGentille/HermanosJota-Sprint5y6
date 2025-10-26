import React, { useRef, useEffect, useState } from "react";
import madera_Certif from "../images/Home/madera-certificada.png"
import madera_nativa from "../images/Home/arbol-nativo.png"
import acabados from "../images/Home/sostenibilidad.png"
import proveedores from "../images/Home/proveedores-locales.png"
import mat_reciclados from "../images/Home/reciclados.png"
import cero_plasticos from "../images/Home/cero-plasticos.png"

function PrincipiosCarousel() {
  const carouselRef = useRef(null);
  const dotsContainerRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [dotsCount, setDotsCount] = useState(0);

  const visibleElements = () => (window.innerWidth >= 1024 ? 3 : 1);

  useEffect(() => {
    const carousel = carouselRef.current;
    const dotsContainer = dotsContainerRef.current;
    if (!carousel || !dotsContainer) return;

    const principios = carousel.children;

    const updateDots = () => {
      const vis = visibleElements();
      const cantidadDots = Math.ceil(principios.length / vis);
      setDotsCount(cantidadDots);

      // Crear dots manualmente
      dotsContainer.innerHTML = "";
      for (let i = 0; i < cantidadDots; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === activeDot) dot.classList.add("active");
        dot.addEventListener("click", () => {
          carousel.scrollTo({
            left: i * carousel.offsetWidth,
            behavior: "smooth",
          });
          setActiveDot(i);
        });
        dotsContainer.appendChild(dot);
      }
    };

    updateDots();
    window.addEventListener("resize", updateDots);

    const handleScroll = () => {
      const index = Math.round(carousel.scrollLeft / carousel.offsetWidth);
      setActiveDot(index);

      // Actualizar dot activo
      const dots = dotsContainer.children;
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle("active", i === index);
      }
    };

    carousel.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateDots);
      carousel.removeEventListener("scroll", handleScroll);
    };
  }, [activeDot]);

  return (
    <section className="secc-principios">
      <div className="carousel-principios" ref={carouselRef}>
        <div className="principio">
          <img src={madera_Certif} alt="icono-certificacion" /><br />
          <p>Madera certificada FSC de bosques responsables argentinos</p>
        </div>
        <div className="principio">
          <img src={madera_nativa} alt="icono-maderas-nativas" /><br />
          <p>Prioridad a maderas nativas: algarrobo, quebracho, caldén</p>
        </div>
        <div className="principio">
          <img src={acabados} alt="icono-voc-free" /><br />
          <p>Solo acabados y adhesivos de bajo COV</p>
        </div>
        <div className="principio">
          <img src={proveedores} alt="icono-prov-locales" /><br />
          <p>Proveedores locales dentro del Gran Buenos Aires</p>
        </div>
        <div className="principio">
          <img src={mat_reciclados} alt="icono-mat-reciclados" /><br />
          <p>30% mínimo de materiales recuperados o reciclados</p>
        </div>
        <div className="principio">
          <img src={cero_plasticos} alt="icono-cero-plastic" /><br />
          <p>Cero plásticos de un solo uso en toda la cadena</p>
        </div>
      </div>

      <div className="dots-container" ref={dotsContainerRef}></div>
    </section>
  );
}

export default PrincipiosCarousel;