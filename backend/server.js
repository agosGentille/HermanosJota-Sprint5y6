require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;

const cors = require("cors");
const path = require("path");
const conectarDB = require("./config/db.js");
conectarDB();

const usersRoutes = require("./routes/usersRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const contactoRoutes = require("./routes/ContactRoutes.js");
const carritoRoutes = require("./routes/carritoRoutes");

// ⬇️ NUEVO: importar las rutas de categorías
const categoriesRoutes = require("./routes/categories.js");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://hermanosjotasprint5y6.vercel.app",
  ]
}));
app.use(express.json());

// Middleware global de logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Rutas
app.use("/api", usersRoutes);
app.use("/api/productos", productRoutes);
app.use("/api/contacto", contactoRoutes);
app.use("/api/carrito", carritoRoutes);

// ⬇️ NUEVO: montar /api/categories
app.use("/api/categories", categoriesRoutes);

app.use("/Images", express.static(path.join(__dirname, "public/images")));

// 200
app.get("/", (req, res) => {
  res.status(200).send("Bienvenido a la Mueblería Hermanos Jota!");
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: `Ruta: ${req.originalUrl} - no encontrada` });
});

// 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Error interno" });
});

app.listen(PORT, () => {
  console.log(`Se inició el servidor en el puerto: ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});
