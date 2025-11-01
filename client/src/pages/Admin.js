import React, { useState } from "react";
import "../styles/AdminPage.css";
import AdminProductForm from "../components/AdminProductForm";
import AdminUserForm from "../components/AdminUserForm";
import AdminUser from "../components/AdminUser";
import AdminProductList from "../components/AdminProductList";

// 👇 Imports de categorías (assumiendo que existen esos componentes)
import AdminCategoriasList from "../components/AdminCategoriaList";
import AdminCategoriaForm from "../components/AdminCategoriaForm";

function AdminPage({ showToast, usuario }) {
  const [section, setSection] = useState("manage-products");
  const [selectedCategoriaId, setSelectedCategoriaId] = useState(null);
  const esAdmin = usuario?.rol === "administrador";

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Panel de Administrador</h1>
        <nav className="admin-nav">
          {esAdmin && (
            <button
              className={section === "users" ? "active" : ""}
              onClick={() => setSection("users")}
            >
              Gestionar usuarios
            </button>
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

          {/* Categorías */}
          <button
            className={section === "manage-categories" ? "active" : ""}
            onClick={() => setSection("manage-categories")}
          >
            Gestionar categorías
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
        ) : section === "manage-categories" ? (
          <section className="admin-section">
            <AdminCategoriasList
              showToast={showToast}
              onAddCategoryClick={() => {
                setSelectedCategoriaId(null);
                setSection("add-category");
              }}
              onEditCategory={(categoriaId) => {
                setSelectedCategoriaId(categoriaId);
                setSection("edit-category");
              }}
            />
          </section>
        ) : section === "add-category" ? (
          <section className="admin-section">
            <AdminCategoriaForm
              inPanel={true}
              showToast={showToast}
              onBackClick={() => setSection("manage-categories")}
            />
          </section>
        ) : section === "edit-category" ? (
          <section className="admin-section">
            <AdminCategoriaForm
              inPanel={true}
              showToast={showToast}
              editMode={true}
              categoriaId={selectedCategoriaId}
              onBackClick={() => setSection("manage-categories")}
            />
          </section>
        ) : section === "add-product" ? (
          <section className="admin-section">
            <AdminProductForm inPanel={true} showToast={showToast} />
          </section>
        ) : (
          <section className="admin-section">
            <AdminProductList
              onAddProductClick={() => setSection("add-product")}
              showToast={showToast}
            />
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminPage;
