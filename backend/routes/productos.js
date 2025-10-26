const express = require('express');
const router = express.Router();
const { productos } = require('../data/catalogo');
const { getProductos } = require('../controllers/ProductosController');

// Ruta para todos los productos
router.get('/', getProductos);

// Nueva ruta para producto por id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const producto = productos.find(p => p.id === id);
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
});

module.exports = router;
