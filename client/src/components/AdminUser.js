import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminUser.css";

const AdminUser = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // info del admin logueado
  const emailAdmin = localStorage.getItem("emailUsuario");
  const rolAdmin = localStorage.getItem("rolUsuario");
  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/users", {
        headers: { "Authorization": `Bearer ${token}` },
      });
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

  const handleDelete = async (userId) => {
    if (rolAdmin !== "administrador") {
      alert("Solo el administrador puede eliminar usuarios");
      return;
    }

    if (!window.confirm("¿Eliminar usuario?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Error eliminando usuario");
      await fetchUsers();
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el usuario");
    }
  };

  const handleToggleRole = async (user) => {
    if (rolAdmin !== "administrador") {
      alert("Solo el administrador puede cambiar roles");
      return;
    }

    if (user.email === emailAdmin) {
      alert("No puedes cambiar tu propio rol");
      return;
    }

    const userRol = (user.rol || "").toLowerCase();
    let nuevoRol;

    // Cambiamos entre visitante <-> editor, el admin no se toca
    if (userRol === "visitante") nuevoRol = "editor";
    else if (userRol === "editor") nuevoRol = "visitante";
    else {
      alert("No se puede modificar el rol de este usuario");
      return;
    }

    const confirmMsg = `¿Seguro que quieres cambiar el rol de ${user.nombreCompleto} a ${nuevoRol}?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await fetch(`http://localhost:4000/api/users/role/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ rol: nuevoRol }),
      });
      if (!res.ok) throw new Error("Error actualizando rol");
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
            const userRol = (u.rol || "").toLowerCase();
            const toggleLabel =
              userRol === "editor" ? "Convertir a visitante" :
              userRol === "visitante" ? "Convertir a editor" : "-";

            return (
              <li key={u._id} className="admin-user-row">
                <div className="user-info">
                  <div><strong>Nombre:</strong> {u.nombreCompleto || "-"}</div>
                  <div><strong>DNI:</strong> {u.dni || "-"}</div>
                  <div><strong>Email:</strong> {u.email || "-"}</div>
                  <div><strong>Teléfono:</strong> {u.telefono || "-"}</div>
                  <div><strong>Rol:</strong> {u.rol || "-"}</div>
                </div>

                <div className="user-actions">
                  {userRol !== "administrador" && (
                    <button onClick={() => handleToggleRole(u)}>{toggleLabel}</button>
                  )}
                  {userRol !== "administrador" && (
                    <button onClick={() => handleDelete(u._id)}>Eliminar</button>
                  )}
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
