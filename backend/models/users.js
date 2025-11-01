const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombreCompleto: { type: String, required: true },
  dni: { type: String },
  email: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
  telefono: { type: String },
  rol: {type: mongoose.Schema.Types.ObjectId, ref: "Rol", required: true},
  direccionCalle: { type: String },
  direccionLocalidad: { type: String },
  direccionProvincia: { type: String },
  direccionPais: { type: String },
});

module.exports = mongoose.model("User", userSchema, "users");
