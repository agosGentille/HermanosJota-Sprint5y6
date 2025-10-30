const Producto = require("../models/producto");

// GET todos los productos
const getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET producto por _id de MongoDB o por id personalizado
const getProductoPorId = async (req, res) => {
  try {
    let producto;
    
    // Si el parámetro parece un ObjectId de MongoDB (24 caracteres hexadecimales)
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      producto = await Producto.findById(req.params.id);
    } else {
      // Si no, buscar por el id personalizado
      producto = await Producto.findOne({ id: req.params.id });
    }
    
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST crear nuevo producto
const postProducto = async (req, res) => {
  try {
    // Verificar si ya existe un producto con el mismo id personalizado
    if (req.body.id) {
      const productoExistente = await Producto.findOne({ id: req.body.id });
      if (productoExistente) {
        return res.status(400).json({ error: "Ya existe un producto con este ID personalizado" });
      }
    }

    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT actualizar producto por _id o id personalizado
const updateProducto = async (req, res) => {
  try {
    let productoActualizado;
    
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      productoActualizado = await Producto.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
    } else {
      productoActualizado = await Producto.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
    }

    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE eliminar producto por _id o id personalizado
const deleteProducto = async (req, res) => {
  try {
    let productoEliminado;
    
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    } else {
      productoEliminado = await Producto.findOneAndDelete({ id: req.params.id });
    }

    if (!productoEliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProductos,
  getProductoPorId,
  postProducto,
  updateProducto,
  deleteProducto,
};