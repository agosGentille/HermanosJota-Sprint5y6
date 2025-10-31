const Category = require("../models/category"); // Cambiar la importación

// GET todas las categorías
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET categoría por ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST crear nueva categoría
const createCategory = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre de la categoría es obligatorio' });
    }

    // Verificar si ya existe una categoría con el mismo nombre
    const categoryExistente = await Category.findOne({ 
      nombre: { $regex: new RegExp(`^${nombre.trim()}$`, 'i') } 
    });
    
    if (categoryExistente) {
      return res.status(400).json({ error: "Ya existe una categoría con este nombre" });
    }

    const nuevaCategory = new Category({
      nombre: nombre.trim(),
      descripcion: descripcion?.trim() || ''
    });

    const categoryGuardada = await nuevaCategory.save();
    res.status(201).json(categoryGuardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT actualizar categoría
const updateCategory = async (req, res) => {
  try {
    const categoryActualizada = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!categoryActualizada) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(categoryActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE eliminar categoría
const deleteCategory = async (req, res) => {
  try {
    // Verificar si hay productos usando esta categoría
    const Producto = require("../models/producto");
    const productosConCategory = await Producto.findOne({ categoria: req.params.id });
    
    if (productosConCategory) {
      return res.status(400).json({ 
        error: "No se puede eliminar la categoría porque hay productos asociados a ella" 
      });
    }

    const categoryEliminada = await Category.findByIdAndDelete(req.params.id);
    
    if (!categoryEliminada) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json({ message: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};