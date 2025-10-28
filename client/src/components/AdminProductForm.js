import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AdminForm.css";

const AdminProductForm = ({ editMode = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [producto, setProducto] = useState({
    id: "",
    titulo: "",
    descripcion: "",
    Precio: "",
    categoria: "",
    medidas: "",
    materiales: "",
    acabado: "",
    peso: "",
    capacidad: "",
    tapizado: "",
    confort: "",
    almacenamiento: "",
    cables: "",
    extension: "",
    carga_max: "",
    caracteristicas: "",
    regulacion: "",
    certificacion: "",
    apilables: "",
    incluye: "",
    rotacion: "",
    garantia: "",
    estructura: "",
    sostenibilidad: "",
    colchon: "",
    masVendidos: false,
    stock: 0, // ✅ CAMPO STOCK AGREGADO
    imagen: "",
    imagenHover: "",
  });

  // Cargar producto si está en modo edición
  useEffect(() => {
    if (editMode && id) {
      const fetchProducto = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/api/productos/${id}`
          );
          if (!response.ok) throw new Error("Error cargando producto");
          const data = await response.json();
          setProducto(data);
        } catch (error) {
          console.error("Error:", error);
          alert("Error al cargar el producto");
        }
      };
      fetchProducto();
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editMode
        ? `http://localhost:4000/api/productos/${id}`
        : "http://localhost:4000/api/productos";

      const method = editMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al guardar el producto");
      }

      // Redirigir después de guardar
      navigate("/productos");
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-form-container">
      <div className="admin-form-header">
        <h2>{editMode ? "Editar Producto" : "Crear Nuevo Producto"}</h2>
        <button className="btn-volver" onClick={() => navigate("/productos")}>
          ← Ver Catálogo
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Sección: Información Básica */}
        <div className="form-section">
          <h3>Información Básica</h3>

          <div className="form-group">
            <label>ID * (Identificador único)</label>
            <input
              type="text"
              name="id"
              value={producto.id}
              onChange={handleChange}
              required
              disabled={editMode}
              placeholder="Ej: silla-ergonomica-001"
            />
            <small>Este ID debe ser único y no podrá cambiarse después</small>
          </div>

          <div className="form-group">
            <label>Título *</label>
            <input
              type="text"
              name="titulo"
              value={producto.titulo}
              onChange={handleChange}
              required
              placeholder="Nombre del producto"
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
              rows="3"
              placeholder="Descripción detallada del producto"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Precio *</label>
              <input
                type="number"
                name="Precio"
                value={producto.Precio}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label>Stock *</label>
              <input
                type="number"
                name="stock"
                value={producto.stock}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
              />
            </div>
            <div className="form-group">
              <label>Categoría</label>
              <input
                type="text"
                name="categoria"
                value={producto.categoria}
                onChange={handleChange}
                placeholder="Ej: Sillas, Mesas, Sofás..."
              />
            </div>
          </div>

          <div className="form-group form-checkbox">
            <input
              type="checkbox"
              name="masVendidos"
              checked={producto.masVendidos}
              onChange={handleChange}
            />
            <label>Marcar como producto más vendido</label>
          </div>
        </div>

        {/* Sección: Imágenes */}
        <div className="form-section">
          <h3>Imágenes</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Imagen Principal</label>
              <input
                type="text"
                name="imagen"
                value={producto.imagen}
                onChange={handleChange}
                placeholder="/Images/ruta-imagen-principal.jpg"
              />
              <small>Ruta relativa desde la carpeta public</small>
            </div>
            <div className="form-group">
              <label>Imagen Hover</label>
              <input
                type="text"
                name="imagenHover"
                value={producto.imagenHover}
                onChange={handleChange}
                placeholder="/Images/ruta-imagen-hover.jpg"
              />
              <small>Imagen que se muestra al pasar el mouse</small>
            </div>
          </div>
        </div>

        {/* Sección: Especificaciones Técnicas */}
        <div className="form-section">
          <h3>Especificaciones Técnicas</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Medidas</label>
              <input
                type="text"
                name="medidas"
                value={producto.medidas}
                onChange={handleChange}
                placeholder="Ej: 200x90x85 cm"
              />
            </div>
            <div className="form-group">
              <label>Materiales</label>
              <input
                type="text"
                name="materiales"
                value={producto.materiales}
                onChange={handleChange}
                placeholder="Materiales utilizados"
              />
            </div>
            <div className="form-group">
              <label>Acabado</label>
              <input
                type="text"
                name="acabado"
                value={producto.acabado}
                onChange={handleChange}
                placeholder="Tipo de acabado"
              />
            </div>
            <div className="form-group">
              <label>Peso</label>
              <input
                type="text"
                name="peso"
                value={producto.peso}
                onChange={handleChange}
                placeholder="Ej: 25 kg"
              />
            </div>
            <div className="form-group">
              <label>Capacidad</label>
              <input
                type="text"
                name="capacidad"
                value={producto.capacidad}
                onChange={handleChange}
                placeholder="Capacidad de carga"
              />
            </div>
            <div className="form-group">
              <label>Tapizado</label>
              <input
                type="text"
                name="tapizado"
                value={producto.tapizado}
                onChange={handleChange}
                placeholder="Tipo de tapizado"
              />
            </div>
          </div>
        </div>

        {/* Sección: Características de Confort */}
        <div className="form-section">
          <h3>Características de Confort</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Confort</label>
              <input
                type="text"
                name="confort"
                value={producto.confort}
                onChange={handleChange}
                placeholder="Características de confort"
              />
            </div>
            <div className="form-group">
              <label>Almacenamiento</label>
              <input
                type="text"
                name="almacenamiento"
                value={producto.almacenamiento}
                onChange={handleChange}
                placeholder="Capacidades de almacenamiento"
              />
            </div>
            <div className="form-group">
              <label>Regulación</label>
              <input
                type="text"
                name="regulacion"
                value={producto.regulacion}
                onChange={handleChange}
                placeholder="Sistemas de regulación"
              />
            </div>
            <div className="form-group">
              <label>Rotación</label>
              <input
                type="text"
                name="rotacion"
                value={producto.rotacion}
                onChange={handleChange}
                placeholder="Grados de rotación"
              />
            </div>
          </div>
        </div>

        {/* Sección: Características Adicionales */}
        <div className="form-section">
          <h3>Características Adicionales</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Cables</label>
              <input
                type="text"
                name="cables"
                value={producto.cables}
                onChange={handleChange}
                placeholder="Incluye cables"
              />
            </div>
            <div className="form-group">
              <label>Extensión</label>
              <input
                type="text"
                name="extension"
                value={producto.extension}
                onChange={handleChange}
                placeholder="Longitud de extensión"
              />
            </div>
            <div className="form-group">
              <label>Carga Máxima</label>
              <input
                type="text"
                name="carga_max"
                value={producto.carga_max}
                onChange={handleChange}
                placeholder="Peso máximo soportado"
              />
            </div>
            <div className="form-group">
              <label>Características</label>
              <input
                type="text"
                name="caracteristicas"
                value={producto.caracteristicas}
                onChange={handleChange}
                placeholder="Otras características"
              />
            </div>
          </div>
        </div>

        {/* Sección: Certificaciones y Garantía */}
        <div className="form-section">
          <h3>Certificaciones y Garantía</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Certificación</label>
              <input
                type="text"
                name="certificacion"
                value={producto.certificacion}
                onChange={handleChange}
                placeholder="Certificaciones del producto"
              />
            </div>
            <div className="form-group">
              <label>Garantía</label>
              <input
                type="text"
                name="garantia"
                value={producto.garantia}
                onChange={handleChange}
                placeholder="Ej: 2 años"
              />
            </div>
            <div className="form-group">
              <label>Estructura</label>
              <input
                type="text"
                name="estructura"
                value={producto.estructura}
                onChange={handleChange}
                placeholder="Tipo de estructura"
              />
            </div>
            <div className="form-group">
              <label>Sostenibilidad</label>
              <input
                type="text"
                name="sostenibilidad"
                value={producto.sostenibilidad}
                onChange={handleChange}
                placeholder="Características sostenibles"
              />
            </div>
          </div>
        </div>

        {/* Sección: Características Específicas */}
        <div className="form-section">
          <h3>Características Específicas</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Apilables</label>
              <input
                type="text"
                name="apilables"
                value={producto.apilables}
                onChange={handleChange}
                placeholder="¿Es apilable?"
              />
            </div>
            <div className="form-group">
              <label>Incluye</label>
              <input
                type="text"
                name="incluye"
                value={producto.incluye}
                onChange={handleChange}
                placeholder="Elementos incluidos"
              />
            </div>
            <div className="form-group">
              <label>Colchón</label>
              <input
                type="text"
                name="colchon"
                value={producto.colchon}
                onChange={handleChange}
                placeholder="Especificaciones del colchón"
              />
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="form-actions">
          <button type="submit" className="btn-guardar" disabled={loading}>
            {loading
              ? "Guardando..."
              : editMode
              ? "Actualizar Producto"
              : "Crear Producto"}
          </button>
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => navigate("/productos")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
