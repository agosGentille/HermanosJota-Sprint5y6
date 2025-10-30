import React, { useState } from "react";
import "../styles/AdminPage.css";
import AdminProductForm from "../components/AdminProductForm";
import AdminUserForm from "../components/AdminUserForm";
import AdminUser from "../components/AdminUser";
import AdminProductList from "../components/AdminProductList";

function AdminPage({ showToast, usuario }) {
  const [section, setSection] = useState("manage-products");
  const esAdmin = usuario?.rol === "administrador";

  return (
    <div className="admin-page">
      
      <header className="admin-header">
        <h1>Panel de Administrador</h1>
        <nav className="admin-nav">
          {/* <button
            className={section === "create-user" ? "active" : ""}
            onClick={() => setSection("create-user")}
          >
            Crear usuarios
          </button> */}
          {esAdmin && (
            <>
              <button
                className={section === "users" ? "active" : ""}
                onClick={() => setSection("users")}
              >
                Gestionar usuarios
              </button>
            </>
          )}
          <button
            className={section === "add-product" ? "active" : ""}
            onClick={() => setSection("add-product")}
          >
            Agregar producto
          </button>
          <button
            className={section === "manage-products" ? "active" : ""}
            onClick={() => setSection("manage-products")}
          >
            Gestionar productos
          </button>
        </nav>
      </header>

      <main className="admin-main">
        {section === "create-user" ? (
          <section className="admin-section">
            <AdminUserForm showToast={showToast} />
          </section>
        ) : section === "users" ? (
          <section className="admin-section">
            <AdminUser />
          </section>
        ) : section === "add-product" ? (
          <section className="admin-section">
            <AdminProductForm inPanel={true} showToast={showToast} />
          </section>
        ) : (
          <section className="admin-section">
            <AdminProductList onAddProductClick={() => setSection("add-product")} showToast={showToast} />
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminPage;