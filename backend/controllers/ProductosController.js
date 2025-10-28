const Producto = require("../models/producto");

// GET todos los productos
const getAllProductos =
  ("/",
  async (req, res) => {
    try {
      const productos = await Producto.find();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

const getProductoPorId =
  ("/:id",
  async (req, res) => {
    try {
      const producto = await Producto.findOne({ id: req.params.id });
      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

const postProducto =
  ("/",
  async (req, res) => {
    try {
      // Verificar si ya existe un producto con el mismo id
      const productoExistente = await Producto.findOne({ id: req.body.id });
      if (productoExistente) {
        return res
          .status(400)
          .json({ error: "Ya existe un producto con este ID" });
      }

      const nuevoProducto = new Producto(req.body);
      const productoGuardado = await nuevoProducto.save();
      res.status(201).json(productoGuardado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

const updateProducto =
  ("/:id",
  async (req, res) => {
    try {
      const productoActualizado = await Producto.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!productoActualizado) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json(productoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

const deleteProducto =
  ("/:id",
  async (req, res) => {
    try {
      const productoEliminado = await Producto.findOneAndDelete({
        id: req.params.id,
      });

      if (!productoEliminado) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

      res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = {
  getAllProductos,
  getProductoPorId,
  postProducto,
  updateProducto,
  deleteProducto,
};
