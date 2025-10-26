const { productos } = require('../data/catalogo.js');

const getProductos = (req, res) => {
  res.json(productos); // Devuelve todo el array
};

module.exports = { getProductos };