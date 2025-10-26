const express = require("express");
const router = express.Router();


let carritos = {};

// Obtener carrito
router.get("/:usuario", (req, res) => {
  const { usuario } = req.params;
  const carritoUsuario = carritos[usuario] || [];
  res.json(carritoUsuario);
});

// Guardar/Actualizar carrito
router.post("/:usuario", (req, res) => {
  const { usuario } = req.params;
  const carrito = req.body;
  if (!Array.isArray(carrito)) {
    return res.status(400).json({ error: "El carrito debe ser un array" });
  }

  carritos[usuario] = carrito;
  res.json({ success: true, carrito: carritos[usuario] });
});

// Vaciar carrito
router.delete("/:usuario", (req, res) => {
  const { usuario } = req.params;
  carritos[usuario] = [];
  res.json({ success: true });
});

module.exports = router;