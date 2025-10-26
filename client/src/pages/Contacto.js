import React from "react";
import "../styles/Contacto.css";
import ContactForm from "../components/ContactForm";
import logo from "../images/logo.svg";
import videoMP4 from "../public/videos/Video-institucional-Hermanos-Jota.mp4";
import videoWEBM from "../public/videos/Video-institucional-Hermanos-Jota.webm";

function App() {
  return (
    <div>
      <main className="principal">
        <h1 className="contacto__titulo">Nuestra Historia</h1>
        <div className="nuestra-historia">
          <p className="nuestra-historia__texto">
            En{" "}
            <span className="nuestra-historia__texto__resaltar">
              Hermanos Jota
            </span>{" "}
            creemos que un mueble no es solo un objeto, sino{" "}
            <span className="nuestra-historia__texto__resaltar">
              una parte esencial de la vida cotidiana
            </span>
            . Desde nuestros comienzos, hemos trabajado para{" "}
            <span className="nuestra-historia__texto__resaltar">
              redescubrir el arte de la carpintería
            </span>
            , creando piezas que{" "}
            <span className="nuestra-historia__texto__resaltar">
              trascienden su función
            </span>{" "}
            y transmiten calidez, historia y carácter.
          </p>

          <br />

          <p className="nuestra-historia__texto">
            Cada diseño surge del{" "}
            <span className="nuestra-historia__texto__resaltar">
              encuentro entre herencia e innovación
            </span>
            . Honramos las técnicas tradicionales que nos identifican, mientras
            exploramos{" "}
            <span className="nuestra-historia__texto__resaltar">
              nuevas formas y líneas modernas
            </span>{" "}
            que mantienen la esencia artesanal. Usamos{" "}
            <span className="nuestra-historia__texto__resaltar">
              maderas nobles de origen responsable
            </span>
            , acabados naturales y procesos que reflejan nuestro{" "}
            <span className="nuestra-historia__texto__resaltar">
              compromiso con la sustentabilidad
            </span>
            .
          </p>

          <br />

          <p className="nuestra-historia__texto">
            Con más de{" "}
            <span className="nuestra-historia__texto__resaltar">
              30 años de tradición
            </span>
            , acompañamos a nuestros clientes en la construcción de hogares
            llenos de identidad. Cada pieza de{" "}
            <span className="nuestra-historia__texto__resaltar">
              Hermanos Jota
            </span>{" "}
            está pensada para{" "}
            <span className="nuestra-historia__texto__resaltar">
              envejecer con gracia
            </span>
            , convertirse en parte de tu historia y ofrecerte un{" "}
            <span className="nuestra-historia__texto__resaltar">
              legado que trasciende generaciones
            </span>
            .
          </p>

          <br />
          <h2 className="nuestra-historia__texto__subtitulo">
            Video Institucional - Hermanos Jota
          </h2>
          <video poster={logo} preload="metadata" controls autoPlay={false}>
            <source src={videoMP4} type="video/mp4" />
            <source src={videoWEBM} type="video/webm" />
            Tu navegador no soporta el elemento video.
          </video>
        </div>

        <h1 className="contacto__titulo" id="contacto-form">
          Haga una pregunta
        </h1>
        <div className="contacto">
          <ContactForm />
        </div>

        <div className="contacto__container">
          <h1 className="contacto__titulo" id="contacto-digital-titulo">
            Contacto Digital
          </h1>
          <div className="contacto-digital">
            <table className="contacto-digital__tabla">
              <tbody>
                <tr>
                  <td className="contacto-digital__tabla__elemento-izquierdo">
                    Email general
                  </td>
                  <td>
                    <a href="mailto:info@hermanosjota.com.ar">
                      info@hermanosjota.com.ar
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="contacto-digital__tabla__elemento-izquierdo">
                    Ventas
                  </td>
                  <td>
                    <a href="mailto:ventas@hermanosjota.com.ar">
                      ventas@hermanosjota.com.ar
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="contacto-digital__tabla__elemento-izquierdo">
                    Instagram
                  </td>
                  <td>
                    <a
                      href="https://www.instagram.com/hermanosjota_ba"
                      target="_blank"
                      rel="noreferrer"
                    >
                      @hermanosjota_ba
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="contacto-digital__tabla__elemento-izquierdo">
                    WhatsApp
                  </td>
                  <td>
                    <a
                      href="https://wa.me/5491145678900"
                      target="_blank"
                      rel="noreferrer"
                    >
                      +54 11 4567-8900
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h1 className="contacto__titulo" id="contacto-ubicacion-titulo">
            Nuestra Ubicación
          </h1>
          <div className="contacto__ubicacion">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.2170030862508!2d-58.40964451679717!3d-34.623956088796405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccae2a0c04a2f%3A0x77f381af8f0ca1fa!2sAv.%20San%20Juan%202847%2C%20C1232AAK%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1759593663815!5m2!1ses-419!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Hermanos Jota en Google Maps"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
