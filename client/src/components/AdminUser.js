import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminUser.css";

const AdminUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/users");
      if (!res.ok) throw new Error("Error cargando usuarios");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      alert("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (userId) => {
    // Ajusta la ruta según tu routing en la app
    navigate(`/usuarios/${userId}/editar`);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar usuario");
      // refrescar la lista después de eliminar
      await fetchUsers();
    } catch (err) {
      console.error(err);
      alert(err.message || "Error al eliminar usuario");
    }
  };

  return (
    <div className="admin-users-container">
      <h2>Usuarios</h2>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : users.length === 0 ? (
        <p>No hay usuarios para mostrar.</p>
      ) : (
        <ul className="admin-users-list">
          {users.map((u) => {
            const id = u._id || u.id || u.dni;
            return (
              <li key={id} className="admin-user-row">
                <div className="user-info">
                  <div>
                    <strong>Nombre:</strong>{" "}
                    {u.nombreCompleto || u.nombre || "-"}
                  </div>
                  <div>
                    <strong>DNI:</strong> {u.dni || "-"}
                  </div>
                  <div>
                    <strong>Email:</strong> {u.email || "-"}
                  </div>
                  <div>
                    <strong>Teléfono:</strong> {u.telefono || "-"}
                  </div>
                  <div>
                    <strong>Rol:</strong> {u.rol || "-"}
                  </div>
                </div>

                <div className="user-actions">
                  <button onClick={() => handleEdit(id)}>Modificar</button>
                  <button onClick={() => handleDelete(id)}>Eliminar</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AdminUser;
