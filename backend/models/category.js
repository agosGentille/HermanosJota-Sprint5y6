const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    descripcion: {
      type: String,
      trim: true
    },
    activa: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const Categoria = mongoose.model("Category", categoriaSchema);
module.exports = Categoria;