import React, { useState, useEffect } from "react";
import '../styles/HeaderFooter.css';
import { validarEmail } from "../utils/validarEmail";

function ModalRegister({ show, onClose, onLogin, onShowLogin}) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false); 
  const [showPassword2, setShowPassword2] = useState(false);

  useEffect(() => {
    if (show) {
      setNombre("");
      setEmail("");
      setPassword("");
      setPassword2("");
      setError("");
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { valido, error: errorEmail } = validarEmail(email);
    if (!valido) {
      setError(errorEmail);
      setLoading(false);
      return;
    }

    if (password !== password2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setTimeout(async () => {
      try {
        const res = await fetch("http://localhost:4000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, email, password })
        });

        setLoading(false);

        if (!res.ok) {
          const data = await res.json();
          setError(data.error || "Error al registrarse");
          return;
        }

        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("nombreUsuario", data.usuario.nombre);
        localStorage.setItem("emailUsuario", data.usuario.email);

        onLogin({ nombre: data.usuario.nombre });
        onClose();
      } catch (err) {
        setError("No se pudo conectar con el servidor");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="modal" style={{ display: show ? 'flex' : 'none' }}>
      <div className="modal-content">
        <div className="botones-cerrar-volver">
          <span
            className="volver"
            onClick={() => {
              onClose();
              if (onShowLogin) onShowLogin();
            }}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </span>
          <span className="close" onClick={onClose}>&times;</span>
        </div>
        <h2>Registro</h2>
        <p className={`errorLogin ${error ? "active" : ""}`}>* {error}</p>
        <form onSubmit={handleSubmit} className="loginForm">
          <input type="text" required placeholder="Nombre Completo" value={nombre} onChange={e => setNombre(e.target.value)} />
          <input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <div className="password">
            <input
              type={showPassword1 ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
            <span
              className="material-symbols-outlined password-toggle"
              onClick={() => setShowPassword1(!showPassword1)}
            >
              {showPassword1 ? "visibility_off" : "visibility"}
            </span>
          </div>

          <div className="repetir-password">
            <input
              type={showPassword2 ? "text" : "password"}
              value={password2}
              onChange={e => setPassword2(e.target.value)}
              placeholder="Repetir Contraseña"
              required
            />
            <span
              className="material-symbols-outlined password-toggle"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {showPassword2 ? "visibility_off" : "visibility"}
            </span>
          </div>
          
          <button type="submit" className="button-submit">{loading ? "Registrando..." : "Registrarse"}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalRegister;