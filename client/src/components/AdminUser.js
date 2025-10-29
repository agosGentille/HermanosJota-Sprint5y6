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

  const handleDelete = (userId) => {
    if (!window.confirm("¿Eliminar usuario?")) return;
    try {
      console.log("Eliminando usuario con ID:", userId);
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el usuario");
    }
  }

const handleToggleRole = async (user) => {
  const rol = (user.rol || "").toString().toLowerCase();
  const isAdmin = rol === "admin";
  const confirmMsg = isAdmin
    ? "¿Seguro que querés convertir este admin en visitante?"
    : "¿Seguro que querés convertir este visitante en admin?";
  if (!window.confirm(confirmMsg)) return;

  const newRole = isAdmin ? "visitante" : "admin";
  try {
    // const res = await fetch(`http://localhost:4000/api/users/${user.id}/role`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ rol: newRole }),
    // });
    console.log(`Cambiando rol del usuario ${user._id || user.id || user.dni} a ${newRole}`);
    // if (!res.ok) throw new Error("Error actualizando rol");
    await fetchUsers();
  } catch (err) {
    console.error(err);
    alert("No se pudo cambiar el rol");
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
            const rol = (u.rol || "").toString().toLowerCase();
            const isAdmin = rol === "admin";
            const toggleLabel = isAdmin ? "Convertir a visitante" : "Convertir a admin";

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
                  <button onClick={() => handleToggleRole(u)}>{toggleLabel}</button>
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
