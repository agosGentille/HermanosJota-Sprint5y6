const express = require("express");
const router = express.Router();

const {
  getAllProductos,
  getProductoPorId,
  postProducto,
  updateProducto,
  deleteProducto,
} = require("../controllers/ProductosController");

// GET todos los productos
router.get("/", getAllProductos);

// GET producto por id personalizado
router.get("/:id", getProductoPorId);

// POST crear nuevo producto
router.post("/", postProducto);

// PUT actualizar producto por id personalizado
router.put("/:id", updateProducto);

// DELETE eliminar producto por id personalizado
router.delete("/:id", deleteProducto);

module.exports = router;
