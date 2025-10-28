import React, { useState } from "react";
import "../styles/AdminPage.css";
import AdminProductForm from "../components/AdminProductForm";
import AdminUserForm from "../components/AdminUserForm";
import AdminUser from "../components/AdminUser";

function AdminPage() {
  const [section, setSection] = useState("users");

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Panel de Administrador</h1>
        <nav className="admin-nav">
          <button
            className={section === "create-user" ? "active" : ""}
            onClick={() => setSection("create-user")}
          >
            Crear usuarios
          </button>
          <button
            className={section === "users" ? "active" : ""}
            onClick={() => setSection("users")}
          >
            Visualizar usuarios
          </button>
          <button
            className={section === "products" ? "active" : ""}
            onClick={() => setSection("products")}
          >
            Gestionar productos
          </button>
        </nav>
      </header>

      <main className="admin-main">
        {section === "create-user" ? (
          <section className="admin-section">
            <AdminUserForm />
          </section>
        ) : section === "users" ? (
          <section className="admin-section">
            <AdminUser />
          </section>
        ) : (
          <section className="admin-section">
            <AdminProductForm />
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminPage;
